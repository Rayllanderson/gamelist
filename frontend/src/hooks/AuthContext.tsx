import { createContext, ReactNode, useCallback, useState } from 'react';
import api from '../services/api';

interface SignInCretendials {
  username: string;
  password: string;
}

interface SignUpCretendials {
  name: string;
  email: string;
  username: string;
  password: string;
}
interface AuthContextData {
  user: object;
  signIn: (credentials: SignInCretendials) => Promise<void>
  signUp: (credentials: SignUpCretendials) => Promise<void>
  signOut: () => void;
}
interface AuthProviderProps {
  children: ReactNode;
}

interface AuthState {
  token: string;
  user: object;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GameList:token');
    const user = localStorage.getItem('@GameList:user');
    if (token && user && user !== 'undefined') {
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ username, password }) => {
    const response = await api.post('login', {
      username, password
    });
    const { token, name, email } = response.data;
    const user = { username, name, email };
    localStorage.setItem('@GameList:token', token);
    localStorage.setItem('@GameList:user', JSON.stringify(user));
    setData({ token, user });
  }, [])

  const signUp = useCallback(async ({ name, email, username, password }) => {
    await api.post('users', {
      name, email, username, password
    });
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@GameList:token');
    localStorage.removeItem('@GameList:user');
    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}

