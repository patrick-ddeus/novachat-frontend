/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState, useContext } from 'react';
import io from 'socket.io-client';

import Messages from './Message';
import UserContext, {
  UserContextProps,
  UserState,
} from '../../../contexts/UserContext';

import MessagesApi, {
  MessagesResponse,
} from '../../../service/api/messagesApi';

import DialogArea from './DialogArea';
import ChannelContext, {
  ChannelContextProps,
} from '../../../contexts/ChannelContext';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

const socket = io('http://localhost:8082');

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<MessagesResponse[]>([]);
  // State when user is typing
  const [userStatus, setUserStatus] = useState({
    user: '',
    message: '',
    channelId: 1,
  });
  const [messageInput, setMessageInput] = useState('');

  const { storageValue, state } = useContext(UserContext) as UserContextProps;
  const { channel } = useContext(ChannelContext) as ChannelContextProps;

  const userStorageValue = storageValue as UserState;
  const router = useRouter();

  const fetchMessages = async () => {
    try {
      const { data } = await MessagesApi.getMessages(
        channel,
        state.userData.token as string
      );
      setMessages(data);
    } catch (error) {
      if (error instanceof AxiosError && error.request.status === '401') {
        router.push('/');
      }
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [channel]);

  useEffect(() => {
    const handleUserSendingStatus = (data: typeof userStatus) => {
      const user = state.userData.username;
      if (user !== data.user) setUserStatus(data);
    };

    const handleMessages = (data: MessagesResponse) => {
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
    const id = state.userData.id;

    if(messageInput.length === 0) return

    socket.emit('messages', {
      authorId: id,
      Author: {
        username: userStorageValue.userData.username,
      },
      content: messageInput,
      channelId: channel,
      createdAt: Date.now(),
    });

    setMessageInput('');

    socket.emit('userSendingStatus', {
      user: '',
      message: '',
      channelId: channel,
    });
  };

  const handleChangeOnInputMessage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const user = state.userData.username;
    const typingData =
      value.length > 0
        ? { user, message: 'is typing!', channelId: channel }
        : { user: '', message: '', channelId: channel };

    socket.emit('userSendingStatus', typingData);

    if (value.length === 0) {
      setUserStatus({ user: '', message: '', channelId: channel });
    }

    setMessageInput(value);
  };

  return (
    <div className="h-[70vh] w-screen bg-white absolute bottom-0 left-0 rounded-t-3xl">
      <Messages channel={channel} messages={messages} userId={userStorageValue.userData.id} />
      <form
        action=""
        onSubmit={(e) => e.preventDefault()}
        className="absolute bottom-0 border border-t border-[#EEFAF8] p-5 py-3 pb-5 w-full bg-white"
      >
        {channel === userStatus.channelId && (
          <span className="text-xs font-bold inline-block mb-2">
            {userStatus.user} {userStatus.message}
          </span>
        )}

        <DialogArea
          value={messageInput}
          onChange={handleChangeOnInputMessage}
          buttonOnClick={() => sendMessage()}
          onKeyUp={(event) => event.key === 'Enter' && sendMessage()}
        />
      </form>
    </div>
  );
};

export default ChatBox;
