'use client';
import React, { useEffect, useState, useContext } from 'react';
import { IoSend } from 'react-icons/io5';
import io from 'socket.io-client';
import UserContext from '../../../contexts/UserContext';

import Messages from '../Message';

const socket = io('http://localhost:8082');

export interface Message {
  id: number;
  author: string;
  authorId: number;
  content: string;
  channelId: number;
  createdAt: number;
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      authorId: 6,
      channelId: 1,
      author: 'Robert Abraham',
      id: 1,
      content: 'Mensagem enviada por alguém ai',
      createdAt: Date.now(),
    },
    {
      authorId: 2,
      channelId: 1,
      author: 'Patrick Fontes',
      id: 21,
      content: 'Mensagem enviada por mim',
      createdAt: Date.now(),
    },
  ]);
  const [userStatus, setUserStatus] = useState({ user: '', message: '' });
  const [messageInput, setMessageInput] = useState('');

  const context = useContext(UserContext);
  const userData = JSON.parse(localStorage.getItem('userData') as string);

  useEffect(() => {
    const handleUserSendingStatus = (data: any) => {
      const user = context?.state.userData.username;
      if (user !== data.user) setUserStatus(data);
    };

    const handleMessages = (data: any) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on('userSendingStatus', handleUserSendingStatus);
    socket.on('messages', handleMessages);

    return () => {
      socket.off('userSendingStatus', handleUserSendingStatus);
      socket.off('messages', handleMessages);
    };
  }, [messages, userStatus]);

  const sendMessage = () => {
    const id = context?.state.userData.id;
    socket.emit('messages', {
      authorId: id,
      author: userData.userData.username,
      content: messageInput,
      channelId: 1,
      createdAt: Date.now(),
    });
    setMessageInput('');
    socket.emit('userSendingStatus', { user: '', message: '' });
  };

  const handleChangeOnInputMessage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const user = context?.state.userData.username;
    const typingData =
      value.length > 0
        ? { user, message: 'is typing!' }
        : { user: '', message: '' };

    socket.emit('userSendingStatus', typingData);

    if (value.length === 0) {
      setUserStatus({ user: '', message: '' });
    }

    setMessageInput(value);
  };

  return (
    <div className="h-[78vh] w-screen bg-white absolute bottom-0 left-0 rounded-t-3xl">
      <Messages messages={messages} userId={userData.userData.id} />
      <form
        action=""
        onSubmit={(e) => e.preventDefault()}
        className="absolute bottom-0 border border-t border-[#EEFAF8] p-5 py-3 pb-5 w-full"
      >
        <span className="text-xs font-bold inline-block mb-2">
          {userStatus.user} {userStatus.message}
        </span>
        <div className="flex">
          <input
            type="text"
            value={messageInput}
            placeholder="Write your message"
            onChange={handleChangeOnInputMessage}
            className="w-full bg-[#F3F6F6] p-5 h-12 rounded-xl placeholder-[#797C7B]"
          />
          <button
            type="button"
            onClick={() => sendMessage()}
            className="text-2xl p-3 ml-4 text-white rounded-full flex justify-center items-center bg-[#20A090]"
          >
            <IoSend />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
