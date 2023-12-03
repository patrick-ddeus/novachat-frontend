'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useContext, useState } from 'react';
import { useForm } from '@/hooks/useForm';

import AuthInput from '../../components/AuthInput';
import { EditProfileSchema } from '@/schemas/editProfileSchema';
import Button from '../../components/Button';

import guy from '@/public/images/guy.png';
import ProfileApi from '@/service/api/profileApi';
import UserContext, { UserContextProps } from '../../../contexts/UserContext';

interface Inputs {
  username: string;
  email: string;
  aboutMe: string;
}

const Profile: React.FC<{ params: { userId: string } }> = ({ params }) => {
  const { state } = useContext(UserContext) as UserContextProps;
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    aboutMe: '',
  });

  const { errors, handleSubmit, handleChange, data } = useForm<Inputs>({
    initialValues: { ...profile },
    schema: EditProfileSchema,
    onSubmit: async (data) => {},
  });

  const router = useRouter();

  const fetchProfile = async () => {
    const { data } = await ProfileApi.getProfile(
      params.userId,
      state.userData.token
    );

    setProfile({
      ...profile,
      username: data.nickname,
      aboutMe: data.aboutMe as string,
      email: data.user.email,
    });
  };

  useEffect(() => {
    const paramToNumber = parseInt(params.userId);
    if (isNaN(paramToNumber)) {
      router.push('/');
    }

    try {
      fetchProfile();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#000E08]">
      <section className="flex flex-col justify-center items-center pt-16">
        <Image
          src={guy}
          alt="a guy with background yellow"
          className="w-20 h-20"
        />
        <h4 className="text-white mt-4 text-xl">{profile.username}</h4>
        <form
          onSubmit={handleSubmit}
          className="flex gap-6 flex-col h-[65vh] w-screen bg-white absolute bottom-0 left-0 rounded-t-3xl p-7"
        >
          <AuthInput
            label="Username"
            inputType="text"
            name="username"
            error={errors.username}
            value={profile.username}
            onChange={(e) => handleChange('username')(e)}
          />

          <AuthInput
            label="Email"
            inputType="text"
            name="email"
            error={errors.email}
            value={profile.email}
            onChange={(e) => handleChange('email')(e)}
          />

          <AuthInput
            label="About me"
            inputType="text"
            name="aboutMe"
            error={errors.aboutMe}
            value={profile.aboutMe}
            onChange={(e) => handleChange('aboutMe')(e)}
          />
          <div className="mt-10">
            <Button label="Save" />
          </div>
        </form>
      </section>
    </div>
  );
};

export default Profile;
