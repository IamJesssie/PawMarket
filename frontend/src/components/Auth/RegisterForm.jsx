import React, { useState } from 'react';
import InputField from './InputField';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agree: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register attempt:', formData);
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

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div style={{ flex: 1 }}>
          <InputField
            label="First Name"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => handleChange({ target: { name: 'firstName', value: e.target.value } })}
            required
          />
        </div>
        <div style={{ flex: 1 }}>
          <InputField
            label="Last Name"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => handleChange({ target: { name: 'lastName', value: e.target.value } })}
            required
          />
        </div>
      </div>
      
      <InputField
        label="Email Address"
        type="email"
        placeholder="user@example.com"
        value={formData.email}
        onChange={(e) => handleChange({ target: { name: 'email', value: e.target.value } })}
        required
      />

      <InputField
        label="Phone Number"
        type="tel"
        placeholder="+1 (555) 000-0000"
        value={formData.phone}
        onChange={(e) => handleChange({ target: { name: 'phone', value: e.target.value } })}
        required
      />

      <InputField
        label="Password"
        type="password"
        placeholder="•••••••••••"
        value={formData.password}
        onChange={(e) => handleChange({ target: { name: 'password', value: e.target.value } })}
        required
      />

      <InputField
        label="Confirm Password"
        type="password"
        placeholder="Re-enter password"
        value={formData.confirmPassword}
        onChange={(e) => handleChange({ target: { name: 'confirmPassword', value: e.target.value } })}
        required
      />

      <div style={{ marginBottom: '15px' }}>
        <label style={{ fontSize: '14px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            required
          /> I agree to the Terms of Service and Privacy Policy
        </label>
      </div>

      <button type="submit" style={buttonStyle}>CREATE ACCOUNT</button>
    </form>
  );
};

export default RegisterForm;
