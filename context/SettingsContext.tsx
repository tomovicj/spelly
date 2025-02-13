import React, { createContext, ReactNode, useEffect, useState } from "react";
import { loadSettings, saveSettings, Settings } from "@/utils/settings";

type SettingsContextType = {
  settings: Settings;
  updateSettings: (newSettings: Settings) => void;
};

export const SettingsContext = createContext<SettingsContextType>({
  settings: {},
  updateSettings: () => {},
});

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings>({});

  // Load settings from storage on mount
  useEffect(() => {
    (async () => {
      const loadedSettings = await loadSettings();
      setSettings(loadedSettings);
    })();
  }, []);

  // Save settings to storage whenever they change
  useEffect(() => {
    if (Object.keys(settings).length === 0) {
      return;
    }
    saveSettings(settings);
  }, [settings]);

  const updateSettings = (newSettings: Settings) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      ...newSettings,
    }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
