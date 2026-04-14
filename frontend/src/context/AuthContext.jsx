import { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: true };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null
      };
    case 'LOGIN_FAIL':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
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
    loading: true,
    error: null
  });

 
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('pawmarket_user'));
    if (user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  }, []);

  const login = async (email, password) => {
    dispatch({ type: 'SET_LOADING' });
    
  
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email && password) {
          const user = { email, name: email.split('@')[0], id: Date.now() };
          localStorage.setItem('pawmarket_user', JSON.stringify(user));
          dispatch({ type: 'LOGIN_SUCCESS', payload: user });
          resolve({ success: true });
        } else {
          dispatch({ type: 'LOGIN_FAIL', payload: 'Invalid credentials' });
          resolve({ success: false, error: 'Invalid credentials' });
        }
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('pawmarket_user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
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
