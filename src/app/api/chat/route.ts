
import { NextRequest, NextResponse } from 'next/server';
import { getVectorStore } from '@/lib/astradb';
import { AIMessage, HumanMessage } from '@langchain/core/messages';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  PromptTemplate,
} from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import {
  LangChainStream,
  StreamingTextResponse,
  Message as VercelChatMessage,
} from 'ai';
import { UpstashRedisCache } from '@langchain/community/caches/upstash_redis';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { createHistoryAwareRetriever } from 'langchain/chains/history_aware_retriever';
import { createRetrievalChain } from 'langchain/chains/retrieval';
import https from 'https';


const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(8, '30s'),
});

export async function POST(req: NextRequest) {

console.log('api requested,dddddddddddddddddddddddddddddd')

  try {

 const ip = req.ip ?? 'ip';
 const { success, remaining } = await ratelimit.limit(ip);

 // block the request if unsuccessfull
 if (!success) {
   return new Response('Ratelimited!', { status: 429 });
 }

    const body = await req.json();
    const messages = body.messages;

    const chatHistory = messages
      .slice(0, -1)
      .map((m: VercelChatMessage) =>
        m.role === 'user'
          ? new HumanMessage(m.content)
          : new AIMessage(m.content)
      );

    const currentMessageContent = messages[messages.length - 1].content;

    const cache = new UpstashRedisCache({
      client: Redis.fromEnv({
        agent: new https.Agent({ keepAlive: true }),
      }),
    });

    const { stream, handlers } = LangChainStream();

    const chatModel = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
      modelName: 'gpt-3.5-turbo',
      streaming: true,
      callbacks: [handlers],
      verbose: true,
      cache,
    });

    const rephrasingModel = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
      modelName: 'gpt-3.5-turbo',
      verbose: true,
      cache,
    });

    const retriever = (await getVectorStore()).asRetriever();

    const rephrasePrompt = ChatPromptTemplate.fromMessages([
      new MessagesPlaceholder('chat_history'),
      ['user', '{input}'],
      [
        'user',
        'Given the above conversation, generate a search query to look up in order to get information relevant to the current question. ' +
          "Don't leave out any relevant keywords. Only return the query and no other text.",
      ],
    ]);

    const historyAwareRetrieverChain = await createHistoryAwareRetriever({
      llm: rephrasingModel,
      retriever,
      rephrasePrompt,
    });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        "You are a chatbot for a Decentralized betting website named DecentBet. You impersonate the website's owner. " +
          "Answer the user's questions based on the below context. " +
          'Format your messages in markdown format.\n\n' +
          'Context:\n{context}',
      ],
      new MessagesPlaceholder('chat_history'),
      ['user', '{input}'],
    ]);

    const combineDocsChain = await createStuffDocumentsChain({
      llm: chatModel,
      prompt,
      documentSeparator: '\n--------\n',
    });

    const retrievalChain = await createRetrievalChain({
      combineDocsChain,
      retriever: historyAwareRetrieverChain,
    });

    retrievalChain.invoke({
      input: currentMessageContent,
      chat_history: chatHistory,
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Error:---",error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
