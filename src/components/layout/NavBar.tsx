
import React from 'react';
import { Moon, Sun, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLearning } from '@/context/LearningContext';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  const { theme, toggleTheme, currentModule } = useLearning();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-lg bg-background/50 transition-all duration-200">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          {currentModule && (
            <Link to="/">
              <Button variant="ghost" size="icon" aria-label="Home">
                <Home className="h-5 w-5" />
              </Button>
            </Link>
          )}
          <h1 className="font-semibold text-lg">
            <Link to="/" className="transition-colors hover:text-primary">
              LearningApp
            </Link>
          </h1>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          onClick={toggleTheme}
          className="rounded-full"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 transition-all" />
          ) : (
            <Moon className="h-5 w-5 transition-all" />
          )}
        </Button>
      </div>
    </header>
  );
};

export default NavBar;
