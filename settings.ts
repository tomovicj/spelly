import { Href } from "expo-router";

export type SettingConfig = (
  | SettingSwitchConfig
  | SettingSelectConfig
  | SettingLinkConfig
) & {
  id: string;
  label: string;
};

type SettingSwitchConfig = {
  type: "switch";
  defaultValue: boolean;
};

type SettingSelectConfig = {
  type: "select";
  options: string[];
  defaultValue: string;
};

type SettingLinkConfig = {
  type: "link";
  route: Href;
};

const settings: SettingConfig[] = [
  { id: "1", label: "Notifications", type: "switch", defaultValue: true },
  { id: "2", label: "Dark Mode", type: "switch", defaultValue: false },
  { id: "3", label: "Voice", type: "link", route: "/settings/voice" },
];

export default settings;
