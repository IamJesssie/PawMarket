import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import InputField from './InputField';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [localError, setLocalError] = useState(null);
  
  const emailRef = useRef(null);
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();

  // useEffect Hook: Focus the email input on component mount
  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    
    const result = await login(email, password);
    
    if (result.success) {
      navigate('/');
    } else {
      setLocalError(result.error || 'Failed to login');
    }
  };

  const buttonStyle = {
    backgroundColor: 'black',
    color: 'white',
    padding: '12px',
    border: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: loading ? 'not-allowed' : 'pointer',
    width: '100%',
    marginTop: '10px',
    opacity: loading ? 0.7 : 1,
  };

  const linkStyle = {
    color: 'black',
    fontSize: '14px',
    textDecoration: 'underline',
    cursor: 'pointer',
    textAlign: 'right',
  };

  const checkboxRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  };

  const errorStyle = {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
    border: '1px solid red',
    padding: '10px',
  };

  return (
    <form onSubmit={handleSubmit}>
      {(localError || error) && <div style={errorStyle}>{localError || error}</div>}
      <div ref={emailRef}>
        <InputField
          label="Email Address"
          type="email"
          placeholder="user@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <InputField
        label="Password"
        type="password"
        placeholder="•••••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      
      <div style={checkboxRowStyle}>
        <label style={{ fontSize: '14px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          /> Remember me
        </label>
        <span style={linkStyle}>Forgot password?</span>
      </div>

      <button type="submit" style={buttonStyle} disabled={loading}>
        {loading ? 'LOGGING IN...' : 'LOGIN'}
      </button>
      
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <p style={{ fontSize: '14px' }}>Don't have an account? Register →</p>
      </div>
    </form>
  );
};

export default LoginForm;
