import React from 'react';
import { Triangle } from 'react-loader-spinner';

const LoadingIcon: React.FC = () => {
  return (
    <>
      <p className="mb-4 font-bold text-lg text-green-950">NovaChat</p>
      <Triangle
        height="80"
        width="80"
        color="#24786D"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </>
  );
};

export default LoadingIcon;
