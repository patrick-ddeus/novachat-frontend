import { createContext, ReactNode, useReducer, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

interface UserData {
  token: string;
  username: string;
  id: number;
}

interface UserState {
  userData: UserData;
}

interface UserContextProps {
  state: UserState;
  setUserInfo: (token: string, username: string, id: number) => void;
  deleteUserInfo: () => void;
}

interface UserAction {
  type: 'SET_USER_INFO' | 'DELETE_USER_INFO';
  payload: UserData;
}

const initialState: UserState = {
  userData: {
    token: '',
    username: '',
    id: 0,
  },
};

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return { ...state, userData: action.payload };
    case 'DELETE_USER_INFO':
      return { ...state, userData: { token: '', id: 0, username: '' } };
    default:
      return state;
  }
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

export default UserContext;

export function UserProvider({ children }: { children: ReactNode }) {
  const { saveValue, deleteValue, localValue } = useLocalStorage<UserState>(
    'userData',
    initialState
  );

  const [state, dispatch] = useReducer(userReducer, localValue as UserState);

  const setUserInfo = (token: string, username: string, id: number) => {
    dispatch({ type: 'SET_USER_INFO', payload: { token, username, id } });
    saveValue('userData', { userData: { token, username, id } });
  };

  const deleteUserInfo = () => {
    dispatch({
      type: 'SET_USER_INFO',
      payload: { token: '', id: 0, username: '' },
    });
    deleteValue('userData');
  };

  return (
    <UserContext.Provider value={{ state, setUserInfo, deleteUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
