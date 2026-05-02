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
        // Fetch profile data from Supabase with a fallback to user metadata
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle(); // maybeSingle avoids throwing error if missing

        const profile = {
          fullName: profileData?.full_name || user.user_metadata?.full_name || user.email.split('@')[0],
          email: user.email,
          phone: profileData?.phone || 'Not set',
          avatarUrl: profileData?.avatar_url || user.user_metadata?.avatar_url || 'https://www.figma.com/api/mcp/asset/4f7cd715-1f04-4a73-89f7-5c766ee5c8d0',
          memberSince: profileData?.member_since || '2024'
        };

        dispatch({ type: 'AUTH_SUCCESS', payload: { user, profile } });
    } catch (e) {
        console.error("Profile sync error:", e);
        // Fallback to basic user info so app doesn't stay "Logging In"
        dispatch({ 
            type: 'AUTH_SUCCESS', 
            payload: { 
                user, 
                profile: { fullName: user.email.split('@')[0], email: user.email } 
            } 
        });
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await fetchProfileAndDispatch(session.user);
      } else {
        dispatch({ type: 'LOGOUT' });
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await fetchProfileAndDispatch(session.user);
      } else {
        dispatch({ type: 'LOGOUT' });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signup = async (email, password, fullName) => {
    dispatch({ type: 'SET_LOADING' });
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    if (error) {
      dispatch({ type: 'AUTH_FAIL', payload: error.message });
      return { success: false, error: error.message };
    }
    return { success: true, data };
  };

  const login = async (email, password) => {
    dispatch({ type: 'SET_LOADING' });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      dispatch({ type: 'AUTH_FAIL', payload: error.message });
      return { success: false, error: error.message };
    }
    
    // Explicitly fetch profile after successful login
    if (data.user) {
        await fetchProfileAndDispatch(data.user);
    }
    
    return { success: true, data };
  };

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) return { success: false, error: error.message };
    return { success: true };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, signup, loginWithGoogle, logout }}>
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
