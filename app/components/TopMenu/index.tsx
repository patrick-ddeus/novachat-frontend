import React from 'react';
import { IoSearch } from 'react-icons/io5';

const TopMenu: React.FC = () => {
  return (
    <section className="py-16 p-4">
      <ul className="flex justify-between text-white items-center">
        <li className="w-10 h-10 flex justify-center items-center rounded-full border border-[#363F3B]">
          <IoSearch className="text-2xl" />
        </li>
        <li className="text-lg font-medium">Home</li>
        <li>
          <div className="rounded-full w-10 h-10 bg-blue-900"></div>
        </li>
      </ul>
    </section>
  );
};

export default TopMenu;
