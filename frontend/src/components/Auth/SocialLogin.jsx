import React from 'react';
import { useAuth } from '../../context/AuthContext';

const SocialLogin = () => {
  const { loginWithGoogle } = useAuth();

  const handleGoogleLogin = async () => {
    const { success, error } = await loginWithGoogle();
    if (!success) {
      alert(error || 'Failed to login with Google');
    }
  };

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
      <button style={socialButtonStyle} onClick={handleGoogleLogin}>
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="18" height="18" alt="" />
        Google
      </button>
      <button style={socialButtonStyle}>
        <span>f</span> Facebook
      </button>
    </div>
  );
};

export default SocialLogin;
