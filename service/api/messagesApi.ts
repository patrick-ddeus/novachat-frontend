import apiInstance from './api';

export interface MessagesResponse {
  id: number;
  authorId: number;
  content: string;
  channelId: number;
  Author: {
    username: string;
  };
  pinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

function getMessages(channelId: number, token: string) {
  return apiInstance.get<MessagesResponse[]>(`/messages/${channelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

const AuthApi = { getMessages };

export default AuthApi;
