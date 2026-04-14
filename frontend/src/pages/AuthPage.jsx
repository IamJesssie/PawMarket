import React, { useState } from 'react';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';
import SocialLogin from '../components/Auth/SocialLogin';
import './AuthPage.css';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="authPageContainer">
    
      <div className="leftPanel">
        <div className="illustrationPlaceholder">
          <span>WELCOME ILLUSTRATION</span>
        </div>
       
      </div>


      <div className="rightPanel">
        <div className="tabContainer">
          <button 
            className={`tab ${activeTab === 'login' ? 'tabActive' : ''}`} 
            onClick={() => setActiveTab('login')}
          >
            LOGIN
          </button>
        </div>

        {activeTab === 'login' ? (
          <>
            <LoginForm />
            <SocialLogin />
          </>
        ) : (
          <RegisterForm />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
