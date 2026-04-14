import React from 'react';

const SocialLogin = () => {
  const buttonStyle = {
    backgroundColor: 'white',
    color: 'black',
    padding: '10px',
    border: '2px solid black',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px'
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <button style={buttonStyle}>
        <span>G</span> Continue with Google
      </button>
      <button style={buttonStyle}>
        <span>f</span> Continue with Facebook
      </button>
    </div>
  );
};

export default SocialLogin;
