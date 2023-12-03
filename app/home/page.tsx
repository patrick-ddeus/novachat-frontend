import React from 'react';
import { Inter } from 'next/font/google';
import TopMenu from '../components/TopMenu';
import ChatBox from '../components/ChatBox';
import Image from 'next/image';

import JustChatting from '@/public/images/chatting.jpg';

const inter = Inter({ subsets: ['latin'] });
const Home: React.FC = () => {
  return (
    <div
      className={`min-h-screen bg-[#000E08] ${inter.className} relative overflow-x-hidden`}
    >
      <TopMenu />
      <ul className="px-4 my-5 ">
        <div className="flex gap-4 items-center overflow-x-scroll">
          {[...Array(5)].map((_, index) => (
            <li key={index} className="flex flex-col items-center ">
              <Image
                src={JustChatting}
                alt="Naruto"
                width="54"
                height="54"
                className="w-14 h-14 rounded-full bg-white object-cover p-[1px]"
              ></Image>
              <p className="text-white text-sm">Chatting</p>
            </li>
          ))}
        </div>
      </ul>
      <ChatBox />
    </div>
  );
};

export default Home;
