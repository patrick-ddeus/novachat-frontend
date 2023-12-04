'use client';
import React, { useContext } from 'react';
import { IoSearch } from 'react-icons/io5';
import UserContext, { UserContextProps } from '../../../contexts/UserContext';
import { useRouter } from 'next/navigation';
import Guy from '@/public/images/guy2.svg';
import Image from 'next/image';

const TopMenu: React.FC = () => {
  const context = useContext(UserContext) as UserContextProps;
  const router = useRouter();

  return (
    <section className="pt-10 px-4">
      <ul className="flex justify-between text-white items-center">
        <li className="w-10 h-10 flex justify-center items-center rounded-full border border-[#363F3B]">
          <IoSearch className="text-2xl" />
        </li>
        <li className="text-lg font-medium">Home</li>
        <li>
          <Image
            src={Guy}
            alt="guy with blue background"
            className="rounded-full w-10 h-10 bg-blue-900"
            onClick={() => router.push(`/profile/${context.state.userData.id}`)}
          ></Image>
        </li>
      </ul>
    </section>
  );
};

export default TopMenu;
