import useAsync from '../useAsync';
import AuthApi from '../../service/api/authApi';
import { AxiosResponse } from 'axios';

type SignUpResponse = {
  access_token: string;
  createdAt: string;
  email: string;
  id: number;
  updatedAt: string;
  username: string;
}

function useSignUp() {
  const {
    data,
    act: signUp,
    error,
    loading,
  } = useAsync<AxiosResponse<SignUpResponse>, typeof AuthApi.signUp>(
    AuthApi.signUp,
    false
  );
  return {
    data,
    signUp,
    error,
    loading,
  };
}

export default useSignUp;
