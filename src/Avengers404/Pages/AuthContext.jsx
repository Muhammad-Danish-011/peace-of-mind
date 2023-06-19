import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setLoginStatus = (status) => {
    setIsLoggedIn(status);
    status && sessionStorage.setItem("islogin",status);
    
  };

  const setitems =(obj) =>{
    console.log(obj);
    sessionStorage.setItem("objects",obj);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoginStatus, setitems }}>
      {children}
    </AuthContext.Provider>
  );
};
