
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t py-6 bg-background/50 backdrop-blur-md">
      <div className="container flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} LearningApp. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
