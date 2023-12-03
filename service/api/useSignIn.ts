import useAsync from '../../hooks/useAsync';
import AuthApi from './authApi';
import { AxiosResponse } from 'axios';

export type SignInResponse = {
  access_token: string;
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
