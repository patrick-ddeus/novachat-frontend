'use client';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';

import Button from './components/Button';
import Link from 'next/link';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter();

  return (
    <div
      className={`bg-black min-h-screen relative p-4 overflow-hidden ${inter.className}`}
    >
      <p className="text-white text-base text-center block my-4">NovaChat</p>
      <div className="absolute rounded-full left-[-70px] top-[-40px] w-[580px] h-[280px] rotate-[134deg] opacity-60 bg-gradient-to-br from-purple-800 to-blue-900 filter blur-[74px] z-[1]"></div>
      <h1 className="text-[68px] relative font-light text-white -mt-0 z-[2]">
        Connect <br /> friends <br />{' '}
        <span className="font-semibold">easily</span> &<br />
        <span className="font-semibold">quickly</span>
      </h1>
      <p className="text-gray-400 w-72 font-medium text-sm">
        Our chat app is the perfect way to stay connected with friends and
        family.
      </p>
      <div className="my-8">
        <Button
          label="Sign up with email"
          isLight={true}
          onClick={() => router.push('/sign-up')}
        />
      </div>
      <Link
        href="/sign-in"
        className="text-[#bebebe] text-center block font-light"
      >
        Existing account? <span className="font-medium">Log in</span>
      </Link>
    </div>
  );
}
