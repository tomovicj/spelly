import settings from "@/settings";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Settings = {
  [key: string]: string | boolean;
};

export const loadSettings = async (): Promise<Settings> => {
  const defaultSettings: Settings = settings.reduce<Settings>(
    (acc, setting) => {
      acc[setting.key] = setting.defaultValue;
      return acc;
    },
    {}
  );

  const storedSettings: Settings = {};
  try {
    const stored = await AsyncStorage.getItem("settings");
    if (stored) {
      Object.assign(storedSettings, JSON.parse(stored));
    }
  } catch (error) {
    console.error(
      "Failed to load user saved settings; Loading default settings",
      error
    );
    return defaultSettings;
  }

  return {
    ...defaultSettings,
    ...storedSettings,
  };
};

export const saveSettings = async (settings: Settings) => {
  try {
    await AsyncStorage.setItem("settings", JSON.stringify(settings));
  } catch (error) {
    console.error("Failed to save user settings", error);
  }
};
