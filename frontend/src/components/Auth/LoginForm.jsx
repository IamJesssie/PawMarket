import React, { useState } from 'react';
import InputField from './InputField';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password, rememberMe });
  };

  const buttonStyle = {
    backgroundColor: 'black',
    color: 'white',
    padding: '12px',
    border: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%',
    marginTop: '10px',
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

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="Email Address"
        type="email"
        placeholder="jane@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <InputField
        label="Password"
        type="password"
        placeholder="•••••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      
        <span style={linkStyle}>Forgot password?</span>
    

      <button type="submit" style={buttonStyle}>LOGIN</button>
      
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <p style={{ fontSize: '14px' }}>Or Continue with →</p>
      </div>
    </form>
  );
};

export default LoginForm;
