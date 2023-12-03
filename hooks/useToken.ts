import { useContext } from 'react';

import UserContext from '../contexts/UserContext';

export default function useToken() {
  const context = useContext(UserContext);

  return context?.state.userData?.token;
}
