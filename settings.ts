export type SettingsConfig = (
  | SettingsSwitchConfig
  | SettingsSingleChoiceConfig
) & {
  key: string;
  label: string;
};

type SettingsSwitchConfig = {
  type: "switch";
  defaultValue: boolean;
};

type SettingsSingleChoiceConfig = {
  type: "single_choice";
  options: SettingsChoiceConfig[];
  defaultValue: string;
};

type SettingsChoiceConfig = {
  key: string;
  label: string;
};

const settings: SettingsConfig[] = [
  { key: "notifications", label: "Notifications", type: "switch", defaultValue: true },
  { key: "dark_mode", label: "Dark Mode", type: "switch", defaultValue: false },
  { key: "voice", label: "Voice", type: "single_choice", options: [{key: "en-US", label: "English (US)"}], defaultValue: "en-US" },
];

export default settings;
