import React, { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import api from '../services/api';
import Cookie from "js-cookie";

interface SignInCretendials {
  username: string;
  password: string;
}
interface AuthContextData {
  user: object;
  signIn: (credentials: SignInCretendials) => Promise<void>
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

  useEffect(function () {
    localStorage
  }, []);

  const [data, setData] = useState<AuthState>(() => {
    const token = Cookie.get('@GameList:token');
    const user = Cookie.get('@GameList:user');
    if (token && user && user !== 'undefined') {
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ username, password }) => {
    const response = await api.post('login', {
      username, password
    });
    const { token, name } = response.data;
    const user = { username, name };
    Cookie.set('@GameList:token', token);
    Cookie.set('@GameList:user', JSON.stringify(user));
    setData({ token, user });
  }, [])

  const signOut = useCallback(() => {
    Cookie.remove('@GameList:token');
    Cookie.remove('@GameList:user');
    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}