import React from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

interface IAuthInputProps {
  label: string;
  inputType: 'text' | 'password';
  name?: string;
}

const AuthInput: React.FC<IAuthInputProps> = (props) => {
  const { label, inputType, name } = props;
  return (
    <div>
      <span
        className={`text-xs text-[#24786D] font-semibold ${inter.className}`}
      >
        {label}
      </span>
      <input
        type={inputType}
        name={name}
        className="transition-colors border-b focus:border-[#24786D] border-gray-400 w-full py-2 outline-none"
      />
    </div>
  );
};

export default AuthInput;
