import useAsync from '../useAsync';
import AuthApi from '../../service/api/authApi';
import { AxiosResponse } from 'axios';

function useSignUp() {
  const {
    data,
    act: signUp,
    error,
    loading,
  } = useAsync<AxiosResponse<string>, typeof AuthApi.signUp>(
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
