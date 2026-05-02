import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import InputField from './InputField';

const MailIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>);
const LockIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>);

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMsg('');
    setIsSubmitting(true);
    
    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      setErrorMsg(result.error || 'Failed to login. Please check your credentials.');
      setIsSubmitting(false);
    }
  };

  const buttonStyle = {
    backgroundColor: '#fa782d',
    color: 'white',
    padding: '16px',
    border: 'none',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    width: '100%',
    marginTop: '10px',
    borderRadius: '9999px',
    fontFamily: 'Plus Jakarta Sans, sans-serif'
  };

  const linkStyle = {
    color: '#fa782d',
    fontSize: '9px',
    textDecoration: 'none',
    cursor: 'pointer',
    textAlign: 'right',
    fontWeight: '700',
    fontFamily: 'Be Vietnam Pro, sans-serif'
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
      <InputField
        label="Email Address"
        type="email"
        placeholder="jane@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={<MailIcon />}
        required
      />
      <div style={{ position: 'relative' }}>
        <InputField
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<LockIcon />}
          required
        />
        <div style={{ position: 'absolute', right: '0', top: '-2px' }}>
           <span style={linkStyle}>Forgot Password?</span>
        </div>
      </div>

      {errorMsg && <p style={{ color: '#e74c3c', fontSize: '12px', marginBottom: '10px', textAlign: 'center', fontWeight: '600' }}>{errorMsg}</p>}

      <button type="submit" style={buttonStyle} disabled={isSubmitting}>
        {isSubmitting ? 'Logging In...' : 'Log In →'}
      </button>
      
      <div style={{ marginTop: '40px', textAlign: 'center', position: 'relative' }}>
        <div style={{ borderBottom: '1px solid var(--auth-input-bg)', position: 'absolute', width: '100%', top: '50%' }}></div>
        <span style={{ backgroundColor: 'var(--auth-bg)', padding: '0 15px', position: 'relative', fontSize: '9px', color: 'var(--auth-label)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
          OR CONTINUE WITH
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
