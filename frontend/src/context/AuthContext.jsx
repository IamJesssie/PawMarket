import { createContext, useContext, useReducer, useEffect } from 'react';
import { supabase } from '../supabaseClient';

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

  const fetchProfileAndDispatch = async (user) => {
    if (!user) {
      dispatch({ type: 'LOGOUT' });
      return;
    }
    
    try {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        const profile = {
          fullName: profileData?.full_name || user.user_metadata?.full_name || user.email.split('@')[0],
          email: user.email,
          phone: profileData?.phone || 'Not set',
          avatarUrl: profileData?.avatar_url || user.user_metadata?.avatar_url || 'https://www.figma.com/api/mcp/asset/4f7cd715-1f04-4a73-89f7-5c766ee5c8d0',
          memberSince: profileData?.member_since || '2024',
          loyaltyPoints: profileData?.loyalty_points || 0,
          role: profileData?.role || 'USER'
        };

        dispatch({ type: 'AUTH_SUCCESS', payload: { user, profile } });
    } catch (e) {
        dispatch({ 
            type: 'AUTH_SUCCESS', 
            payload: { user, profile: { fullName: user.email.split('@')[0], email: user.email, loyaltyPoints: 0, role: 'USER' } } 
        });
    }
  };

  const updateLocalProfile = (updates) => {
    dispatch({
      type: 'AUTH_SUCCESS',
      payload: {
        user: authState.user,
        profile: { ...authState.profile, ...updates }
      }
    });
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await fetchProfileAndDispatch(session.user);
        } else {
          dispatch({ type: 'LOGOUT' });
        }
      } catch (err) {
        console.error("Init auth error", err);
        dispatch({ type: 'LOGOUT' });
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await fetchProfileAndDispatch(session.user);
      } else if (event === 'SIGNED_OUT') {
        dispatch({ type: 'LOGOUT' });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signup = async (email, password, fullName) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      if (error) return { success: false, error: error.message };
      return { success: true, data };
    } catch (err) {
      return { success: false, error: 'Network error during signup' };
    }
  };

  const login = async (email, password) => {
    try {
      // Use Promise.race to prevent infinite hanging if Supabase client is stuck
      const result = await Promise.race([
        supabase.auth.signInWithPassword({ email, password }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out. Please try again.')), 5000))
      ]);
      
      if (result.error) return { success: false, error: result.error.message };
      return { success: true, data: result.data };
    } catch (error) {
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  const loginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err) {
      return { success: false, error: 'OAuth failed' };
    }
  };

  const logout = async () => {
    try {
      await Promise.race([
        supabase.auth.signOut(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Logout timeout')), 2000))
      ]);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Forcefully clear all Supabase tokens
      for (let key in localStorage) {
        if (key.startsWith('sb-')) {
          localStorage.removeItem(key);
        }
      }
      dispatch({ type: 'LOGOUT' });
      // Reload the page to completely reset the hung Supabase client in memory
      window.location.href = '/login'; 
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, signup, loginWithGoogle, logout, updateLocalProfile }}>
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
