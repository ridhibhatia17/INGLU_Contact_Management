import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for user token or check URL query params for token (from Google OAuth)
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParams = urlParams.get('token');
    let storedUser = JSON.parse(localStorage.getItem('user'));

    if (tokenParams) {
      // If token in URL, set it and fetch user details
      localStorage.setItem('user', JSON.stringify({ token: tokenParams }));
      storedUser = { token: tokenParams };
      // Clear url
      window.history.replaceState({}, document.title, "/");
    }

    if (storedUser && storedUser.token) {
      api.get('/auth/me')
        .then(res => {
          const userData = { ...res.data, token: storedUser.token };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        })
        .catch(() => {
          localStorage.removeItem('user');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.data) {
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
    }
  };

  const register = async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password });
    if (res.data) {
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
