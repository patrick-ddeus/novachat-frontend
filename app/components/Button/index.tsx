import React from 'react';

interface IButtonProps {
  label: string;
}

const Button: React.FC<IButtonProps> = ({ label }) => {
  return (
    <button className="w-full max-[327px] bg-[#24786d] rounded-2xl border-none p-3 text-lime-50">
      {label}
    </button>
  );
};

export default Button;
