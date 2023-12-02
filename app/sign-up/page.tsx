'use client';
import React from 'react';
import AuthInput from '../components/AuthInput';
import Button from '../components/Button';

import { FaArrowLeftLong } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from '../../hooks/useForm';

type Inputs = {
  username: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
};

const SignUp: React.FC = () => {
  const { errors, handleSubmit, handleChange } = useForm<Inputs>({
    initialValues: {
      username: null,
      email: null,
      password: null,
      confirmPassword: null,
    },
    schema: z
      .object({
        username: z
          .string({
            required_error: 'Username is required',
            invalid_type_error: 'Username cant be empty',
          })
          .min(1, { message: 'Username must contain at least one character' })
          .trim(),
        email: z
          .string({
            invalid_type_error: 'Email cant be empty',
          })
          .email({ message: 'Invalid email address' })
          .trim(),
        password: z
          .string({
            required_error: 'Password is required',
            invalid_type_error: 'Password must be a string',
          })
          .min(1, { message: 'Password must contain at least one character' })
          .trim(),
        confirmPassword: z.string({
          required_error: 'Username is required',
          invalid_type_error: 'Password cant be empty',
        }),
      })
      .required()
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
      }),
    onSubmit: (data) => {
      alert('Enviado');
    },
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
        <form
          action="#"
          className="flex gap-6 flex-col"
          onSubmit={handleSubmit}
        >
          <AuthInput
            label="Your name"
            inputType="text"
            name="username"
            onChange={(e) => handleChange('username')(e)}
            error={(errors as Inputs).username}
          />
          <AuthInput
            label="Your email"
            inputType="text"
            name="email"
            onChange={(e) => handleChange('email')(e)}
            error={(errors as Inputs).email}
          />
          <AuthInput
            label="Password"
            inputType="password"
            name="password"
            onChange={(e) => handleChange('password')(e)}
            error={(errors as Inputs).password}
          />
          <AuthInput
            label="Confirm Password"
            inputType="password"
            name="confirmPassword"
            onChange={(e) => handleChange('confirmPassword')(e)}
            error={(errors as Inputs).confirmPassword}
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
