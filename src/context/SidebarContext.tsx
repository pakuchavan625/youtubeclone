import { ReactNode, createContext, useContext, useState } from "react";

type SidebarContextType = {
  isLargOpen: boolean;
  isSmallOpen: boolean;
  toggle: () => void;
  close: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

type SidebarProviderProps = {
  children: ReactNode;
};

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isLargOpen, setIsLargOpen] = useState(true);
  const [isSmallOpen, setIsSmallOpen] = useState(false);

  const isScreenSmall = () => {
    return window.innerWidth < 1024;
  };

  const toggle = () => {
    if (isScreenSmall()) {
      setIsSmallOpen(!isSmallOpen);
    } else {
      setIsLargOpen(!isLargOpen);
    }
  };
  const close = () => {
    if (isScreenSmall()) {
      setIsSmallOpen(false);
    } else {
      setIsLargOpen(false);
    }
  };
  return (
    <SidebarContext.Provider value={{ isLargOpen, isSmallOpen, toggle, close }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return context;
};
