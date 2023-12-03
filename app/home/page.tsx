import React from 'react';
import { Inter } from 'next/font/google';
import TopMenu from '../components/TopMenu';
import ChatBox from '../components/ChatBox';

const inter = Inter({ subsets: ['latin'] });
const Home: React.FC = () => {
  return (
    <div className={`min-h-screen bg-[#000E08] ${inter.className} relative`}>
      <TopMenu />
      <ChatBox />
    </div>
  );
};

export default Home;
