import { cn } from '@/lib/utils';
import { Message, useChat } from 'ai/react';
import { FaRobot } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { FaRegTrashAlt } from 'react-icons/fa';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import type { Metadata } from 'next';


interface AIChatBoxProps {
  open: boolean;
  onClose: () => void;
}

export const metadata: Metadata = {
  title: 'AI chatBot',
  description: 'An AI smartbot integrated in my portfolio, give more about sandeep reddy.',
};

export default function ChatBox({ open, onClose }: AIChatBoxProps) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat({
    api: 'api/chat',
    onError: (e) => {
      console.log(e);
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);


const handleClickOutside = (event:any) => {
  if (modalRef.current && !modalRef.current.contains(event.target)) {
    onClose();
  }
};




  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);


  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);


  const lastMessageIsUser = messages[messages.length - 1]?.role === 'user';

  return (
    <div
      ref={modalRef}
      className={cn(
        'bottom-4 right-0 z-50 w-full max-w-[400px] p-1 xl:right-36',
        open ? 'fixed' : 'hidden'
      )}
    >
      <button onClick={onClose} className="mb-1 ms-auto block">
        <IoMdCloseCircleOutline
          size={30}
          className="rounded-full bg-green-600 hover:bg-red-600 hover:scale-110
        "
        />
      </button>
      <div className="flex h-[500px] flex-col rounded border bg-green-800 shadow-xl">
        <div className="mt-3 h-full overflow-y-auto px-3" ref={scrollRef}>
          {messages.map((message) => (
            <ChatMessage message={message} key={message.id} />
          ))}
          {isLoading && lastMessageIsUser && (
            <ChatMessage
              message={{
                id: 'loading',
                role: 'assistant',
                content: 'Thinking...',
              }}
            />
          )}
          {error && (
            <ChatMessage
              message={{
                id: 'error',
                role: 'assistant',
                content: 'Something went wrong. Please try again!',
              }}
            />
          )}
          {!error && messages.length === 0 && (
            <div className="mx-8 flex h-full flex-col items-center justify-center gap-3 text-center">
              <FaRobot size={28} />
              <p className="text-lg font-medium">
                Send a message to start the AI chat!
              </p>
              <p>
                You can ask the chatbot any question about me and it will find
                the relevant information on this website.
              </p>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="m-3 flex gap-1">
          <button
            type="button"
            className="flex w-10 flex-none items-center justify-center"
            title="Clear chat"
            onClick={() => setMessages([])}
          >
            <FaRegTrashAlt size={24} />
          </button>
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Say something..."
            className="text-green-800 font-semiboldbold grow rounded border bg-background px-3 py-2"
            ref={inputRef}
          />
          <button
            type="submit"
            className="flex w-10 flex-none items-center justify-center disabled:opacity-50 text-black disabled:text-gray-400"
            disabled={input.length === 0}
            title="Submit message"
          >
            <FiSend size={24} />
          </button>
        </form>
      </div>
    </div>
  );
}

interface ChatMessageProps {
  message: Message;
}

function ChatMessage({ message: { role, content } }: ChatMessageProps) {
  const isAiMessage = role === 'assistant';

  return (
    <div
      className={cn(
        'mb-3 flex items-center',
        isAiMessage ? 'me-5 justify-start' : 'ms-5 justify-end'
      )}
    >
      {isAiMessage && <FaRobot size={24} className="mr-2 flex-none" />}
      <div
        className={cn(
          'rounded-md border px-3 py-2',
          isAiMessage ? 'bg-background' : 'bg-foreground text-background'
        )}
      >
        <ReactMarkdown
          components={{
            a: ({ node, ref, ...props }) => (
              <Link
                {...props}
                href={props.href ?? ''}
                className="text-primary font-bold text-green-950 underline"
              />
            ),
            p: ({ node, ...props }) => (
              <p {...props} className="mt-3 first:mt-0" />
            ),
            ul: ({ node, ...props }) => (
              <ul
                {...props}
                className="mt-3 list-inside list-disc first:mt-0"
              />
            ),
            li: ({ node, ...props }) => <li {...props} className="mt-1" />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
