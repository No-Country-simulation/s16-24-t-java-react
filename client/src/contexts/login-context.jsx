import { createContext, useState } from "react";

export const LoginContext = createContext(null);

export const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState(null);

  const handleLogin = () => {
    setIsLogin(true);
  }

  const handleLogout = () => {
    localStorage.removeItem("sportify_jwt_access");
    setIsLogged(false);
    setIsLogin(false);
  }

  const handleIsLogged = (token) => {
    localStorage.setItem("sportify_jwt_access", token)
    setIsLogged(true);
  }

  return (
    <LoginContext.Provider value={{ isLogin, isLogged, username, handleLogin, handleLogout, handleIsLogged, setUsername, setIsLogin }}>
      {children}
    </LoginContext.Provider>
  )
};