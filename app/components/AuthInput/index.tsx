import React from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

interface IAuthInputProps {
  label: string;
  inputType: 'text' | 'password';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
  error?: string | null;
}

const AuthInput: React.FC<IAuthInputProps> = (props) => {
  const { label, inputType, name, error = false, onChange, value } = props;
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
        onChange={onChange}
        value={value}
        className={`transition-colors border-b ${
          Boolean(error)
            ? 'border-red-600'
            : `focus:border-[#24786D] border-gray-400`
        }  w-full py-2 outline-none`}
      />
      <span className="text-xs text-red-600 block text-right h-0">{error}</span>
    </div>
  );
};

export default AuthInput;
