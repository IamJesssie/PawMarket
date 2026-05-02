import React from 'react';

const InputField = ({ label, type = 'text', placeholder, value, onChange, required = false, icon }) => {
  const containerStyle = {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '100%'
  };

  const labelStyle = {
    marginBottom: '8px',
    fontWeight: '700',
    fontSize: '9px',
    color: 'var(--auth-label)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontFamily: 'Be Vietnam Pro, sans-serif'
  };

  const inputWrapperStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'var(--auth-input-bg)',
    borderRadius: '9999px',
    overflow: 'hidden'
  };

  const iconStyle = {
    position: 'absolute',
    left: '16px',
    color: 'var(--auth-label)',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'none'
  };

  const inputStyle = {
    padding: '14px 16px',
    paddingLeft: icon ? '42px' : '16px',
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '13px',
    outline: 'none',
    width: '100%',
    fontFamily: 'Be Vietnam Pro, sans-serif',
    color: 'var(--auth-text)',
    fontWeight: '500'
  };


  return (
    <div style={containerStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      <div style={inputWrapperStyle}>
        {icon && <div style={iconStyle}>{icon}</div>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          style={inputStyle}
        />
      </div>
    </div>
  );
};


export default InputField;
