'use client';
import React from 'react';
import AuthInput from '../components/AuthInput';
import Button from '../components/Button';

import { FaArrowLeftLong } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from '../../hooks/useForm';
const passwordForm = z
  .object({
    password: z.string(),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'], // path of error
  });
const SignUp: React.FC = () => {
  const {} = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    schema: z
      .object({
        username: z.string().trim(),
        email: z.string().email({ message: 'Invalid email address' }).trim(),
        password: z.string().trim(),
        confirmPassword: z.string(),
      })
      .required()
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirm'], // path of error
      }),
  });

  const router = useRouter();

  return (
    <div className="w-full px-7 relative cursor-pointer">
      <div onClick={() => router.back()}>
        <FaArrowLeftLong className="absolute top-[-60px] left-5" />
      </div>
      <section className="flex justify-center items-center flex-col w-full mt-28">
        <h4 className="text-black font-semibold mb-2">
          Sign up with{' '}
          <span className="relative z-[1] after:z-[-1] after:top-3.5 after:right-0 after:absolute after:content-[''] after:w-10 after:h-2 after:bg-[#299286]">
            Email
          </span>
        </h4>
        <p className="text-gray-500 font-normal text-sm text-center mt-2 w-65 px-4">
          Welcome back! Sign in using your social account or email to continue
          us
        </p>
      </section>
      <section className="mt-5">
        <form action="#" className="flex gap-6 flex-col" onSubmit={(e) => {}}>
          <AuthInput label="Your name" inputType="text" name="username" />
          <AuthInput label="Your email" inputType="text" name="email" />
          <AuthInput label="Password" inputType="password" name="password" />
          <AuthInput
            label="Confirm Password"
            inputType="password"
            name="confirmPassword"
          />
          <div className="mt-20">
            <Button label="Create an account" />
          </div>
        </form>
      </section>
    </div>
  );
};

export default SignUp;