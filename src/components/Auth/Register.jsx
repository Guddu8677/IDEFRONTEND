// import React, { useContext, useState } from 'react';
// import { AuthContext } from '../../context/AuthContext';
// import { useNavigate, Link } from 'react-router-dom';

// export default function Register() {
//   const { register } = useContext(AuthContext);
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [err, setErr] = useState(null);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErr(null);
//     try {
//       await register(username, email, password);
//       navigate('/');
//     } catch (error) {
//       setErr(error.message);
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-card">
//         <h2 className="auth-title">Create Account </h2>
//         <p className="auth-subtitle">Join and start exploring</p>
//         <form onSubmit={handleSubmit} className="auth-form">
//           {err && <div style={{color:'salmon'}}>{err}</div>}
//           <div className="form-group">
//             <label>Username</label>
//             <input value={username} onChange={e=>setUsername(e.target.value)} required />
//           </div>
//           <div className="form-group">
//             <label>Email</label>
//             <input value={email} onChange={e=>setEmail(e.target.value)} required />
//           </div>
//           <div className="form-group">
//             <label>Password</label>
//             <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
//           </div>
//           <button type="submit" className="auth-btn">Register</button>
//         </form>
//         <p className="auth-footer">Already have an account? <Link to="/login" className="auth-link">Log In</Link></p>
//       </div>
//     </div>
//   );
// }






import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const { register, user } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);

    try {
      await register(username, email, password);
      navigate('/'); // redirect after successful registration
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Join CipherStudio 👋</h2>
        <p className="auth-subtitle">Create an account to start your journey</p>

        <form onSubmit={handleSubmit} className="auth-form">
          {err && <div style={{ color: 'salmon' }}>{err}</div>}

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-btn">Register</button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login" className="auth-link">Login</Link>
        </p>
      </div>
    </div>
  );
}
