'use client';
import React from 'react';
import LoadingIcon from '../components/LoadingIcon';

const Loading: React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <LoadingIcon />
    </div>
  );
};

export default Loading;
