import { createContext, useContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: true };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        profile: action.payload.profile,
        loading: false,
        isInitializing: false,
        error: null
      };
    case 'AUTH_FAIL':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        profile: null,
        loading: false,
        isInitializing: false,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        profile: null,
        loading: false,
        isInitializing: false,
        error: null
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    user: null,
    profile: null,
    loading: false,
    isInitializing: true,
    error: null
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      dispatch({ 
        type: 'AUTH_SUCCESS', 
        payload: { 
          user: user, 
          profile: { fullName: user.fullName || user.email.split('@')[0], email: user.email } 
        } 
      });
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  }, []);

  const signup = async (email, password, fullName) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fullName })
      });
      
      if (response.ok) {
        return { success: true };
      } else {
        const error = await response.text();
        return { success: false, error };
      }
    } catch (e) {
      return { success: false, error: 'Network error. Please check if the backend is running.' };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data));
        dispatch({ 
          type: 'AUTH_SUCCESS', 
          payload: { 
            user: data, 
            profile: { fullName: data.fullName || data.email.split('@')[0], email: data.email } 
          } 
        });
        return { success: true };
      } else {
        const error = await response.text();
        return { success: false, error };
      }
    } catch (e) {
      return { success: false, error: 'Network error. Please check if the backend is running.' };
    }
  };

  const logout = async () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

