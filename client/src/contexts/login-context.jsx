import { createContext, useState } from "react";

export const LoginContext = createContext(null);

export const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState(null);

  const handleLogin = (token) => {
    console.log(token);
    localStorage.setItem("sportify_jwt_access", token)
    setIsLogin(true);
  }

  const handleLogout = () => {
    localStorage.removeItem("sportify_jwt_access");
    setIsLogin(false);
  }

  return (
    <LoginContext.Provider value={{ isLogin, handleLogin, handleLogout, username, setUsername, setIsLogin }}>
      {children}
    </LoginContext.Provider>
  )
};