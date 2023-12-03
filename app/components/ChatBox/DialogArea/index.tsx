import React from 'react';
import { IoSend } from 'react-icons/io5';

interface IDialogAreaProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  onKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  buttonOnClick: () => void;
}

const DialogArea: React.FC<IDialogAreaProps> = (props) => {
  const { value, onChange, onKeyUp, buttonOnClick } = props;

  return (
    <div className="flex">
      <input
        type="text"
        value={value}
        placeholder="Write your message"
        onKeyUp={onKeyUp}
        onChange={onChange}
        className="w-full bg-[#F3F6F6] p-5 h-12 rounded-xl placeholder-[#797C7B]"
      />
      <button
        type="button"
        onClick={buttonOnClick}
        className="text-2xl p-3 ml-4 text-white rounded-full flex justify-center items-center bg-[#20A090]"
      >
        <IoSend />
      </button>
    </div>
  );
};

export default DialogArea;
