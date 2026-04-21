import React, { useState } from 'react';
import InputField from './InputField';

const UserIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>);
const MailIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>);
const LockIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>);

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    console.log('Register attempt:', formData);
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

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
      <InputField
        label="Full Name"
        placeholder="Alex Walker"
        name="fullName"
        value={formData.fullName}
        onChange={(e) => handleChange({ target: { name: 'fullName', value: e.target.value } })}
        icon={<UserIcon />}
        required
      />
      
      <InputField
        label="Email Address"
        type="email"
        placeholder="alex@example.com"
        name="email"
        value={formData.email}
        onChange={(e) => handleChange({ target: { name: 'email', value: e.target.value } })}
        icon={<MailIcon />}
        required
      />

      <InputField
        label="Password"
        type="password"
        placeholder="••••••••"
        name="password"
        value={formData.password}
        onChange={(e) => handleChange({ target: { name: 'password', value: e.target.value } })}
        icon={<LockIcon />}
        required
      />

      <InputField
        label="Confirm Password"
        type="password"
        placeholder="••••••••"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={(e) => handleChange({ target: { name: 'confirmPassword', value: e.target.value } })}
        icon={<LockIcon />}
        required
      />

      {error && <p style={{ color: '#e74c3c', fontSize: '14px', marginBottom: '10px' }}>{error}</p>}

      <button type="submit" style={buttonStyle}>Create Account</button>
      
      <div style={{ marginTop: '40px', textAlign: 'center', position: 'relative' }}>
        <div style={{ borderBottom: '1px solid var(--auth-input-bg)', position: 'absolute', width: '100%', top: '50%' }}></div>
        <span style={{ backgroundColor: 'var(--auth-bg)', padding: '0 15px', position: 'relative', fontSize: '9px', color: 'var(--auth-label)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
          OR SIGN UP WITH
        </span>
      </div>
    </form>
  );
};

export default RegisterForm;
