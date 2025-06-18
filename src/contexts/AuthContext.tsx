import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Interfaces
export interface AuthState {
  isAuthenticated: boolean;
  userRole: string | null;
}

export interface AuthContextType {
  authState: AuthState;
  login: (role: string) => void;
  logout: () => void;
}

// Default state
const defaultAuthState: AuthState = {
  isAuthenticated: false,
  userRole: null,
};

// Create Context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider Component Props
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const storedAuth = localStorage.getItem('authState');
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth) as AuthState;
        // Basic validation of stored data
        if (typeof parsedAuth.isAuthenticated === 'boolean' &&
            (parsedAuth.userRole === null || typeof parsedAuth.userRole === 'string')) {
          return parsedAuth;
        }
      } catch (error) {
        console.error("Error parsing authState from localStorage:", error);
        // Fallback to default if parsing fails or data is invalid
      }
    }
    return defaultAuthState;
  });

  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(authState));
  }, [authState]);

  const login = (role: string) => {
    if (!role) {
        console.error("Login attempt without a role.");
        // Potentially set a default role or handle error appropriately
        setAuthState({
            isAuthenticated: true,
            userRole: 'employee', // Default role if none provided, or handle error
        });
        return;
    }
    setAuthState({
      isAuthenticated: true,
      userRole: role,
    });
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      userRole: null,
    });
    // localStorage will be updated by the useEffect hook.
    // Optionally, could also explicitly remove: localStorage.removeItem('authState');
    // but current setup handles it by setting to default which is then stored.
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth Hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
