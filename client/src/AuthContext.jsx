import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserID = localStorage.getItem('userID');
    if (token && storedUserID) {
      setIsLoggedIn(true);
      setUserID(storedUserID);
    }
  }, []);

  const login = (token, id) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userID', id);
    setIsLoggedIn(true);
    setUserID(id);
  };

  const logout = () => {
    console.log("Logging out");
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    setIsLoggedIn(false);
    setUserID(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userID, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
