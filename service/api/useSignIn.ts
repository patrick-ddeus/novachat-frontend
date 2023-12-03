import useAsync from '../../hooks/useAsync';
import AuthApi from './authApi';

export type SignInResponse = {
  access_token: string;
};

function useSignIn() {
  const {
    data,
    act: signIn,
    error,
    loading,
  } = useAsync<SignInResponse, typeof AuthApi.signIn>(AuthApi.signIn, false);
  return {
    data,
    signIn,
    error,
    loading,
  };
}

export default useSignIn;
