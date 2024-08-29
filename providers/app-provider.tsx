'use client';

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { Toaster } from 'react-hot-toast';

interface ContextProps {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<ContextProps>({
  sidebarOpen: false,
  setSidebarOpen: (): boolean => false,
});

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  return (
    <AppContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      <Toaster
        toastOptions={{
          duration: 3000,
        }}
      />

      {children}
    </AppContext.Provider>
  );
}

export const useAppProvider = () => useContext(AppContext);
