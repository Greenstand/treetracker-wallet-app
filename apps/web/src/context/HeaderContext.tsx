"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface HeaderContextType {
  isSearchExpanded: boolean;
  setIsSearchExpanded: (expanded: boolean) => void;
  toggleSearchExpanded: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSearchExpanded = () => {
    setIsSearchExpanded(prev => !prev);
  };

  return (
    <HeaderContext.Provider
      value={{
        isSearchExpanded,
        setIsSearchExpanded,
        toggleSearchExpanded,
        searchQuery,
        setSearchQuery,
      }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }
  return context;
}
