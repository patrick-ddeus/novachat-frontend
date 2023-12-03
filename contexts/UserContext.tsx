import { createContext, ReactNode, useReducer, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

interface UserData {
  token: string;
}

interface UserState {
  userData: UserData;
}

interface UserContextProps {
  state: UserState;
  setUserInfo: (token: string) => void;
  deleteUserInfo: () => void;
}

interface UserAction {
  type: 'SET_USER_INFO' | 'DELETE_USER_INFO';
  payload: UserData;
}

const initialState: UserState = {
  userData: {
    token: '',
  },
};

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return { ...state, userData: action.payload };
    case 'DELETE_USER_INFO':
      return { ...state, userData: { token: '' } };
    default:
      return state;
  }
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

export default UserContext;

export function UserProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const { saveValue, deleteValue } = useLocalStorage<UserState>(
    'userData',
    initialState
  );

  const setUserInfo = (token: string) => {
    dispatch({ type: 'SET_USER_INFO', payload: { token } });
    saveValue('userData', { userData: { token } });
  };

  const deleteUserInfo = () => {
    dispatch({ type: 'DELETE_USER_INFO', payload: { token: '' } });
    deleteValue('userData');
  };

  return (
    <UserContext.Provider value={{ state, setUserInfo, deleteUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
