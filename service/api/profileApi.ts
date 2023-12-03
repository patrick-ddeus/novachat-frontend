import apiInstance from './api';

export interface ProfileResponse {
  iid: number;
  avatar: string;
  nickname: string;
  aboutMe?: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}

function getProfile(userId: string, token: string) {
  return apiInstance.get<ProfileResponse>(`/profile/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function updateProfile(
  username: string,
  email: string,
  aboutMe: string,
  userId: string,
  token: string
) {
  return apiInstance.patch<ProfileResponse>(
    `/profile/${userId}`,
    {
      username,
      email,
      aboutMe,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

const ProfileApi = { getProfile, updateProfile };

export default ProfileApi;
