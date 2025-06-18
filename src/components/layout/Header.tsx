import React from 'react';
import ThemeToggleButton from './ThemeToggleButton';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button'; // Assuming Button component is available

export default function Header() {
  const { authState, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center"> {/* Increased height to h-16 for better spacing */}
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-bold sm:inline-block">EmpowerFlow</span>
          </a>
          {/* Navigation links can go here if needed in future */}
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4"> {/* Increased space-x-4 */}
          {authState.isAuthenticated && authState.userRole && (
            <span className="text-sm font-medium text-muted-foreground">
              Role: {authState.userRole.charAt(0).toUpperCase() + authState.userRole.slice(1)}
            </span>
          )}
          <ThemeToggleButton />
          {authState.isAuthenticated && (
            <Button variant="outline" size="sm" onClick={logout}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
