import React, { createContext, ReactNode, useCallback } from 'react';
import api from '../services/api';

interface SignInCretendials{
  username: string;
  password: string;
}

interface AuthContextData {
  name: string;
  signIn: (credentials: SignInCretendials) => Promise<void>
}
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps){

  const signIn = useCallback( async({username, password}) => {
    const response = await api.post('login', {
      username, password
    });
    console.log(response.data)
  }, [])

  return(
    <AuthContext.Provider value={{name: "any", signIn}}>
      {children}
    </AuthContext.Provider>
  )
}