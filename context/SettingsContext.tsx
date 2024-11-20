import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import listOfSettings from "@/settings";

export type Settings = {
  [key: string]: boolean | string;
};

type SettingsContextType = {
  settings: Settings;
  changeSetting: (
    key: keyof Settings,
    value: boolean | string
  ) => Promise<void>;
  refreshSettings: () => Promise<void>;
};

const SETTINGS_KEY = "user_settings";

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

const getDeffaultSettings = (): Settings => {
  const deffaultSettings: Settings = {};
  listOfSettings.forEach((setting) => {
    if ("defaultValue" in setting) {
      deffaultSettings[setting.id] = setting.defaultValue;
    }
  });
  return deffaultSettings;
};

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<Settings>(getDeffaultSettings());

  // Load settings from AsyncStorage
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await AsyncStorage.getItem(SETTINGS_KEY);
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings));
        } else {
          await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    };

    loadSettings();
  }, []);

  // Change a specific setting and persist to AsyncStorage
  const changeSetting = async (
    key: keyof Settings,
    value: boolean | string
  ) => {
    try {
      const updatedSettings = { ...settings, [key]: value };
      setSettings(updatedSettings);
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(updatedSettings));
    } catch (error) {
      console.error("Failed to change setting:", error);
    }
  };

  // Manually refresh settings
  const refreshSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem(SETTINGS_KEY);
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error("Failed to refresh settings:", error);
    }
  };

  return (
    <SettingsContext.Provider
      value={{ settings, changeSetting, refreshSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
