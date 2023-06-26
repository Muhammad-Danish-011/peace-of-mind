import React, { createContext, useState } from "react";
import { object } from "yup";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUserId, setLoginUserId] = useState('');
  const setLoginStatus = (status) => {
    setIsLoggedIn(status);
    status && sessionStorage.setItem("islogin",status);
    
  };

  const setitems =(obj) =>{
    console.log(obj);
    sessionStorage.setItem("objects",obj);
  }
  const updateLoginUserId = (id) => {
    console.log(id);
    setLoginUserId(id);
    sessionStorage.setItem('loginUserId', id);
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoginStatus, setitems,updateLoginUserId, loginUserId }}>
      {children}
    </AuthContext.Provider>
  );
};
