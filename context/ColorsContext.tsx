import React, { createContext, useState, useEffect, useContext, useMemo } from "react";
import { SettingsContext } from "./SettingsContext";

type Colors = {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  error: string;
};

// Define your light and dark theme colors
export const lightColors: Colors = {
  primary: "#F5F5F5",
  secondary: "#4D77FF",
  accent: "#FDCB6E",
  neutral: "#2E2E38",
  error: "#D72638",
};

export const darkColors: Colors = {
  primary: "#2E2E38",
  secondary: "#4D77FF",
  accent: "#FDCB6E",
  neutral: "#F5F5F5",
  error: "#D72638",
};

// Create the context
export const ColorsContext = createContext<Colors | null>(null);

// Custom hook to use colors
export const useColors = () => {
  const context = useContext(ColorsContext);
  if (!context) {
    throw new Error("useColors must be used within a ColorsProvider");
  }
  return context;
};

// Create the provider component
export const ColorsProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const { settings } = useContext(SettingsContext);
  const isDarkMode = Boolean(settings.dark_mode);

	const colors = useMemo(() => (isDarkMode ? darkColors : lightColors), [isDarkMode]);

  return (
    <ColorsContext.Provider value={colors}>
      {children}
    </ColorsContext.Provider>
  );
};
