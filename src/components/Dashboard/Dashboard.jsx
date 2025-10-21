import React, { useContext } from 'react';
import AppLayout from '../AppLayout';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import './Dashboard.css';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="dashboard-root">
      <div className="dashboard-top">
        <div className="brand">CipherStudio</div>
        <div className="top-actions">
          <button className="theme-btn" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <div className="username">Hi, {user?.username}</div>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      </div>

      <AppLayout />
    </div>
  );
}
