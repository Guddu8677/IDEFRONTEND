import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back 👋</h2>
        <p className="auth-subtitle">Login to continue your journey</p>
        <form onSubmit={handleSubmit} className="auth-form">
          {err && <div style={{color:'salmon'}}>{err}</div>}
          <div className="form-group">
            <label>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="auth-btn">Log In</button>
        </form>
        <p className="auth-footer">Don’t have an account? <Link to="/register" className="auth-link">Register</Link></p>
      </div>
    </div>
  );
}
