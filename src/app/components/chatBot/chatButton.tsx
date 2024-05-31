'use client';

import { useState } from 'react';
import Lottie from 'lottie-react';
import ChatBox from './chatBox';
import chatBot from '../../../public/lottieAnime/chatBot.json';


export default function ChatButton() {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  return (
    <>
      <button
        className="z-20 text-white flex flex-col shrink-0 grow-0 justify-around 
                  fixed bottom-16 right-5 rounded-lg
                  mr-1 mb-5 lg:mr-5 lg:mb-5 xl:mr-10 xl:mb-10 hover:scale-110"
        onClick={() => setChatBoxOpen(!chatBoxOpen)}
      >
        
        <Lottie animationData={chatBot} loop={true} className='w-36' />
      </button>
      <ChatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)}  />
    </>
  );
}
