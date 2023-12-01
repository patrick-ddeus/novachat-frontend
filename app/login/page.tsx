import React from 'react';
import AuthInput from '../components/AuthInput';

const Login: React.FC = () => {
  return (
    <div className="w-full px-7">
      <section className="flex justify-center items-center flex-col w-full mt-28">
        <h4 className="text-black font-semibold mb-2">
          <span className="relative after:top-3.5 after:right-0 after:absolute after:content-[''] after:w-12 after:h-2 after:bg-[#58c3b7af]">
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
        <AuthInput label="Your email" inputType="text" name='email'/>
        <AuthInput label="Password" inputType="password" name='password'/>
      </section>
    </div>
  );
};

export default Login;
