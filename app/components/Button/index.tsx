"use client"
import React from 'react';

interface IButtonProps {
  label: string;
  onClick?: () => void;
  isLight?: boolean;
}

const Button: React.FC<IButtonProps> = (props) => {
  const { label, isLight = false, onClick } = props;

  return (
    <button
      onClick={onClick}
      className={`w-full max-[327px] ${
        isLight ? 'bg-[#fff]' : 'bg-[#24786d]'
      }  rounded-2xl border-none p-3  ${
        isLight ? 'text-black' : 'text-lime-50'
      } font-medium cursor-pointer`}
    >
      {label}
    </button>
  );
}; 

export default Button;
