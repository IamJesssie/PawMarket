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
        // Just get the profile. maybeSingle() is safer.
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
          memberSince: profileData?.member_since || '2024'
        };

        dispatch({ type: 'AUTH_SUCCESS', payload: { user, profile } });
    } catch (e) {
        // Fallback so the app doesn't hang
        dispatch({ 
            type: 'AUTH_SUCCESS', 
            payload: { user, profile: { fullName: user.email.split('@')[0], email: user.email } } 
        });
    }
  };

  useEffect(() => {
    // Initial session check
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await fetchProfileAndDispatch(session.user);
      } else {
        dispatch({ type: 'LOGOUT' });
      }
    };

    initAuth();

    // The Background Manager: This handles ALL state changes automatically
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
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  };

  const login = async (email, password) => {
    // We don't dispatch SET_LOADING here anymore to keep the UI snappy
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { success: false, error: error.message };
    return { success: true, data };
  };

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) return { success: false, error: error.message };
    return { success: true };
  };

  const logout = async () => {
    await supabase.auth.signOut();
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
