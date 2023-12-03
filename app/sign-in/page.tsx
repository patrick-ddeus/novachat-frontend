'use client';
import React, { useContext } from 'react';
import AuthInput from '../components/AuthInput';
import Button from '../components/Button';
import Link from 'next/link';

import { FaArrowLeftLong } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { useForm } from '../../hooks/useForm';
import { SignInSchema } from '../../schemas/signInSchema';
import { AxiosError } from 'axios';

import useSignIn from '../../hooks/api/useSignIn';
import UserContext from '../../contexts/UserContext';
import LoadingIcon from '../components/LoadingIcon';

interface Inputs {
  email: string | null;
  password: string | null;
}

const Login: React.FC = () => {
  const { signIn, loading } = useSignIn();
  const context = useContext(UserContext);

  const { errors, handleSubmit, handleChange } = useForm<Inputs>({
    initialValues: {
      email: null,
      password: null,
    },
    schema: SignInSchema,
    onSubmit: async (data) => {
      try {
        const { data: userData } = await signIn(data.email, data.password);
        context?.setUserInfo(
          userData.access_token,
          userData.username,
          userData.id
        );
      } catch (err) {
        if (err instanceof AxiosError) alert(err.response?.data.message);
      }
    },
  });

  const router = useRouter();

  if (loading) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <LoadingIcon />
      </div>
    );
  }

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
      <section className="mt-5 ">
        <form className="flex gap-6 flex-col" onSubmit={handleSubmit}>
          <AuthInput
            label="Your email"
            inputType="text"
            name="email"
            error={errors.email}
            onChange={(e) => handleChange('email')(e)}
          />
          <AuthInput
            label="Password"
            inputType="password"
            name="password"
            error={errors.password}
            onChange={(e) => handleChange('password')(e)}
          />
          <div className="mt-20">
            <Button label="Log in" />
            <Link
              href="/"
              className="text-center block text-sm text-[#24786D] mt-2"
            >
              Forgot password?
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
