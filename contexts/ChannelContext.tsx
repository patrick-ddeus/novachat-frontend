import { ReactNode, useState, createContext } from 'react';

export type ChannelContextProps = {
  channel: number;
  changeChannel: (newChannel: number) => void;
};

const ChannelContext = createContext<ChannelContextProps | undefined>(
  undefined
);

export default ChannelContext;

export function ChannelProvider({ children }: { children: ReactNode }) {
  const [channel, setChannel] = useState<number>(1);

  const changeChannel = (newChannel: number) => {
    setChannel(newChannel);
  };

  return (
    <ChannelContext.Provider value={{ channel, changeChannel }}>
      {children}
    </ChannelContext.Provider>
  );
}
