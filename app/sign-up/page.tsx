'use client';
import React, { useContext } from 'react';
import AuthInput from '../components/AuthInput';
import Button from '../components/Button';

import { FaArrowLeftLong } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { useForm } from '../../hooks/useForm';
import { SignUpSchema } from '../../schemas/signUpSchema';

import LoadingIcon from '../components/LoadingIcon';
import useSignUp from '../../hooks/api/useSignUp';

import { AxiosError } from 'axios';
import UserContext, { UserContextProps } from '../../contexts/UserContext';

type Inputs = {
  username: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
};

const SignUp: React.FC = () => {
  const { signUp, loading } = useSignUp();
  const { setUserInfo } = useContext(UserContext) as UserContextProps;

  const router = useRouter();

  const { errors, handleSubmit, handleChange } = useForm<Inputs>({
    initialValues: {
      username: null,
      email: null,
      password: null,
      confirmPassword: null,
    },
    schema: SignUpSchema,
    onSubmit: async (data) => {
      try {
        const response = await signUp(data.username, data.email, data.password);
        console.log(response.data);
        setUserInfo(
          response.data.access_token,
          response.data.username,
          response.data.id
        );

        router.push('/home');
      } catch (err) {
        if (err instanceof AxiosError) alert(err.response?.data.message);
      }
    },
  });

  if (loading) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <LoadingIcon />
      </div>
    );
  }
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
