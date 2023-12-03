import apiInstance from './api';
import { SignInResponse } from './useSignIn';

function signIn(email: string, password: string) {
  return apiInstance.post<SignInResponse>('/users/sign-in', { email, password });
}

const AuthApi = { signIn };

export default AuthApi;
