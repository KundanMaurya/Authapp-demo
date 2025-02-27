import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, AuthContextType, LoginCredentials, SignupCredentials, User } from '../types/auth';

// Mock user data - in a real app, this would come from an API
const MOCK_USERS = [
  {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  }
];

// Initial auth state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true
};

// Auth reducer
type AuthAction = 
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'SIGNUP_SUCCESS'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'AUTH_LOADED' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    case 'AUTH_LOADED':
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  // Load user from localStorage on initial render
  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem('user');
      
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        } catch (error) {
          localStorage.removeItem('user');
          dispatch({ type: 'AUTH_LOADED' });
        }
      } else {
        dispatch({ type: 'AUTH_LOADED' });
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials): Promise<void> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find user with matching credentials
    const user = MOCK_USERS.find(
      u => u.email === credentials.email && u.password === credentials.password
    );
    
    if (user) {
      const { password, ...userWithoutPassword } = user;
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      dispatch({ type: 'LOGIN_SUCCESS', payload: userWithoutPassword });
    } else {
      throw new Error('Invalid credentials');
    }
  };

  // Signup function
  const signup = async (credentials: SignupCredentials): Promise<void> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if user already exists
    const userExists = MOCK_USERS.some(u => u.email === credentials.email);
    
    if (userExists) {
      throw new Error('User already exists');
    }
    
    // Create new user
    const newUser = {
      id: String(MOCK_USERS.length + 1),
      name: credentials.name,
      email: credentials.email,
      password: credentials.password
    };
    
    // In a real app, you would save this to a database
    MOCK_USERS.push(newUser);
    
    const { password, ...userWithoutPassword } = newUser;
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    dispatch({ type: 'SIGNUP_SUCCESS', payload: userWithoutPassword });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ authState, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};