'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface BackgroundVisibilityContextType {
  isBackgroundVisible: boolean;
  setBackgroundVisible: (visible: boolean) => void;
}

const BackgroundVisibilityContext = createContext<BackgroundVisibilityContextType | undefined>(undefined);

export function BackgroundVisibilityProvider({ children }: { children: ReactNode }) {
  const [isBackgroundVisible, setBackgroundVisible] = useState(false);

  return (
    <BackgroundVisibilityContext.Provider value={{ isBackgroundVisible, setBackgroundVisible }}>
      {children}
    </BackgroundVisibilityContext.Provider>
  );
}

export function useBackgroundVisibility() {
  const context = useContext(BackgroundVisibilityContext);
  if (context === undefined) {
    throw new Error('useBackgroundVisibility must be used within a BackgroundVisibilityProvider');
  }
  return context;
}
