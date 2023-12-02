import React from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

interface IAuthInputProps {
  label: string;
  inputType: 'text' | 'password';
  name?: string;
  error?: boolean;
}

const AuthInput: React.FC<IAuthInputProps> = (props) => {
  const { label, inputType, name, error = false } = props;
  return (
    <div>
      <span
        className={`text-xs ${
          error ? 'text-red-600' : 'text-[#24786D]'
        }  font-semibold ${inter.className}`}
      >
        {label}
      </span>
      <input
        type={inputType}
        name={name}
        onChange={(e) => {}}
        className={`transition-colors border-b ${
          error ? 'border-red-600' : `focus:border-[#24786D] border-gray-400`
        }  w-full py-2 outline-none`}
      />
    </div>
  );
};

export default AuthInput;
