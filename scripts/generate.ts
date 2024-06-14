import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
// Configure dotenv before other imports
import { DocumentInterface } from '@langchain/core/documents';
import { Redis } from '@upstash/redis';
import { JSONLoader } from 'langchain/document_loaders/fs/json';

import { TextLoader } from 'langchain/document_loaders/fs/text';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { getEmbeddingsCollection, getVectorStore } from '../src/lib/astradb';

import { Document } from 'langchain/document';

import data from './DBdata.json';

const fs = require('fs');

async function generateEmbeddings() {
  await Redis.fromEnv().flushdb();

  const vectorStore = await getVectorStore();

  (await getEmbeddingsCollection()).deleteAll();

  
// const loader = new JSONLoader('./scripts/DBdata.json', [
//   '/teamA',
//   '/teamB',
//   '/matchId',
//   "/status",
// ]);

// const docs = await loader.load();

let allDocs = [];

 for  (const { teamA, teamB, matchId, status} of data) {
 
allDocs.push({
  pageContent: `cricket match between ${teamA} and ${teamB}`,
  Content: { teamA, teamB },
  metadata: {
    matchId,
    status,
  },
});
}



fs.writeFile(
  `${__dirname}/DBdata1.json`,
  JSON.stringify(allDocs, null, 2),
  (err: any) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Data written to file successfully');
  }
);

  // Load the docs into the vector store

  await vectorStore.addDocuments(allDocs);
}

generateEmbeddings();
