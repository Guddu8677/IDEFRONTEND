import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [isAuthReady, setIsAuthReady] = useState(true);

  useEffect(() => {
    if (user && token) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, [user, token]);


  const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

 
  const login = async (email, password) => {
    const res = await fetch(`${API}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    let data;
    try {
      data = await res.json();
    } catch {
      throw new Error('Invalid JSON response from server');
    }

    if (!res.ok) throw new Error(data?.message || 'Login failed');

    setUser({ _id: data._id, username: data.username, email: data.email });
    setToken(data.token);
    return data;
  };


  const register = async (username, email, password) => {
    const res = await fetch(`${API}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    let data;
    try {
      data = await res.json();
    } catch {
      throw new Error('Invalid JSON response from server');
    }

    if (!res.ok) throw new Error(data?.message || 'Register failed');

    setUser({ _id: data._id, username: data.username, email: data.email });
    setToken(data.token);
    return data;
  };


  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthReady }}>
      {children}
    </AuthContext.Provider>
  );
}
