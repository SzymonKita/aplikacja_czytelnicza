import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserID = localStorage.getItem('userID');
    const storedIsAdmin = localStorage.getItem('isAdmin') == 'true';
    if (token && storedUserID) {
      setIsLoggedIn(true);
      setUserID(storedUserID);
      setIsAdmin(storedIsAdmin);
    }
  }, []);

  const login = (token, id, admin) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userID', id);
    localStorage.setItem('isAdmin', admin);
    setIsLoggedIn(true);
    setUserID(id);
    setIsAdmin(admin);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    setUserID(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userID, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
