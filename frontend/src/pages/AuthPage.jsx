import React, { useState } from 'react';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';
import SocialLogin from '../components/Auth/SocialLogin';
import styles from './AuthPage.module.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuth = () => setIsLogin(!isLogin);

  return (
    <div className={styles.authPageWrapper}>
      <div className={styles.authContainer}>
        {/* Left Image Section */}
      <div className={styles.imageSection}>
        <div className={isLogin ? styles.loginOverlay : styles.registerOverlay}></div>
        <img 
          src={isLogin ? "/images/login-dog.png" : "/images/register-editorial.png"} 
          alt="Pets" 
          className={styles.bgImage} 
        />
        <div className={styles.imageContent}>
          <h1 className={styles.quote}>
            {isLogin ? "Welcome back to the Pack!" : "Join the Pack!"}
          </h1>
          <p className={styles.author}>
            {isLogin 
              ? "“A house is not a home without a dog.”" 
              : "“Happiness is a warm puppy.”"
            }
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className={`${styles.formSection} ${isLogin ? styles.loginBg : ''}`}>
        <div className={styles.formWrapper}>
          <h2 className={styles.formTitle}>
            {isLogin ? "Log In" : "Create Account"}
          </h2>
          <p className={styles.formSubtitle}>
            {isLogin 
              ? "Enter your credentials to access your account." 
              : "Embark on a new journey of pet care excellence."
            }
          </p>

          {isLogin ? (
            <>
              <LoginForm />
              <div className={styles.toggleText}>
                Don't have an account? 
                <button onClick={toggleAuth} className={styles.toggleLink}>Sign Up</button>
              </div>
            </>
          ) : (
            <>
              <RegisterForm />
              <div className={styles.toggleText}>
                Already have an account? 
                <button onClick={toggleAuth} className={styles.toggleLink}>Log In</button>
              </div>
            </>
          )}

          <div style={{ marginTop: '2rem', width: '100%' }}>
             <SocialLogin isLogin={isLogin} />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AuthPage;
