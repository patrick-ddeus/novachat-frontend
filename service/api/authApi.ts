import apiInstance from './api';
import { SignInResponse } from '../../hooks/api/useSignIn';

function signIn(email: string, password: string) {
  return apiInstance.post<SignInResponse>('/users/sign-in', {
    email,
    password,
  });
}

function signUp(username: string, email: string, password: string) {
  return apiInstance.post('/users/sign-up', {
    username,
    email,
    password,
  });
}

const AuthApi = { signIn, signUp };

export default AuthApi;
