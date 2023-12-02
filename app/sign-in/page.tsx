'use client';
import React from 'react';
import AuthInput from '../components/AuthInput';
import Button from '../components/Button';
import Link from 'next/link';

import { FaArrowLeftLong } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const router = useRouter();
  return (
    <div className="w-full px-7 relative">
      <div onClick={() => router.back()}>
        <FaArrowLeftLong className="absolute top-[-60px] left-5" />
      </div>
      <section className="flex justify-center items-center flex-col w-full mt-28">
        <h4 className="text-black font-semibold mb-2">
          <span className="relative z-[1] after:z-[-1] after:top-3.5 after:right-0 after:absolute after:content-[''] after:w-12 after:h-2 after:bg-[#299286]">
            Log in
          </span>{' '}
          to Chatbox
        </h4>
        <p className="text-gray-500 font-normal text-sm text-center mt-2 w-65 px-4">
          Welcome back! Sign in using your social account or email to continue
          us
        </p>
      </section>
      <section className="mt-5 flex gap-6 flex-col">
        <AuthInput label="Your email" inputType="text" name="email" />
        <AuthInput label="Password" inputType="password" name="password" />
      </section>
      <div className="mt-20">
        <Button label="Log in" />
        <Link
          href="/"
          className="text-center block text-sm text-[#24786D] mt-2"
        >
          Forgot password?
        </Link>
      </div>
    </div>
  );
};

export default Login;
