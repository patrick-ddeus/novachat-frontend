import React from 'react';
import { Inter } from 'next/font/google';
import TopMenu from '../components/TopMenu';

const inter = Inter({ subsets: ['latin'] });
const Home: React.FC = () => {
  return (
    <div className={`min-h-screen bg-[#000E08] ${inter.className} relative`}>
      <TopMenu />
      <div className="h-[70vh] w-screen bg-white absolute bottom-0 left-0 rounded-t-3xl"></div>
    </div>
  );
};

export default Home;
