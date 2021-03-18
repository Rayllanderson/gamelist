import { createContext, ReactNode, useState } from "react";
import { login } from "../services/login_service";
import { LoginInputs } from "../types/types";

interface LoginContextData {
  username: string,
  password: string,
  handleUsernameChange: (e) => void,
  handlePassChange: (e) => void;
  handleSubmit: (e) => void;
}

interface LoginProviderProps {
  children: ReactNode;
}

export const LoginContext = createContext({} as LoginContextData);

export function LoginProvider({ children }: LoginProviderProps) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleUsernameChange(e) {
    setUsername(e.target.value)
  }
  function handlePassChange(e) {
    setPassword(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const inputs: LoginInputs = {
      username: username,
      password: password
    }
    const result = await login(inputs);
    result && alert(result);
  }

  return (
    <LoginContext.Provider value={{
      username,
      password,
      handleUsernameChange,
      handlePassChange,
      handleSubmit
    }}>
      {children}
    </LoginContext.Provider>
  )
}