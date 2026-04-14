import React from 'react';

const InputField = ({ label, type = 'text', placeholder, value, onChange, required = false }) => {
  const containerStyle = {
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column',
  };

  const labelStyle = {
    marginBottom: '5px',
    fontWeight: 'bold',
    fontSize: '14px',
  };

  const inputStyle = {
    padding: '10px',
    border: '2px solid black',
    borderRadius: '0px',
    fontSize: '16px',
    outline: 'none',
  };

  return (
    <div style={containerStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        style={inputStyle}
      />
    </div>
  );
};

export default InputField;
