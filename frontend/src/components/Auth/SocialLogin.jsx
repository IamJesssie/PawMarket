import React from 'react';

const SocialLogin = () => {
  const containerStyle = {
    display: 'flex',
    gap: '1rem',
    width: '100%',
    marginTop: '1.5rem'
  };

  const socialButtonStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    borderRadius: '12px',
    border: '1px solid #e4e3db',
    background: 'white',
    cursor: 'pointer',
    fontFamily: 'Be Vietnam Pro, sans-serif',
    fontWeight: '600',
    fontSize: '0.875rem',
    color: '#006a63'
  };

  return (
    <div style={containerStyle}>
      <button style={socialButtonStyle}>
        <span>G</span> Google
      </button>
      <button style={socialButtonStyle}>
        <span>f</span> Facebook
      </button>
    </div>
  );
};

export default SocialLogin;
