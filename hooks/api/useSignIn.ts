import useAsync from '../useAsync';
import AuthApi from '../../service/api/authApi';
import { AxiosResponse } from 'axios';

export type SignInResponse = {
  access_token: string;
  username: string;
  id: number;
};

function useSignIn() {
  const {
    data,
    act: signIn,
    error,
    loading,
  } = useAsync<AxiosResponse<SignInResponse>, typeof AuthApi.signIn>(
    AuthApi.signIn,
    false
  );
  return {
    data,
    signIn,
    error,
    loading,
  };
}

export default useSignIn;
