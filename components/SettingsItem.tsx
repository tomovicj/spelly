import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { SettingsContext } from "@/context/SettingsContext";

type SettingsItemProps = {
  id: string;
  label: string;
  type: "switch" | "single_choice";
};

const SettingsItem = (props: SettingsItemProps) => {
  const { settings, updateSettings } = useContext(SettingsContext);

  const toggleSwitch = (key: string) => {
    updateSettings({ [key]: !settings[key] as boolean });
  };

  if (props.type === "single_choice") {
    return (
      <View style={styles.settingsItem}>
        <Text style={styles.label}>{props.label}</Text>
      </View>
    );
  }

  if (props.type === "switch") {
    return (
      <TouchableOpacity
        style={styles.settingsItem}
        onPress={() => toggleSwitch(props.id)}
      >
        <Text style={styles.label}>{props.label}</Text>
        <Switch
          value={settings[props.id] as boolean}
          onValueChange={() => toggleSwitch(props.id)}
        />
      </TouchableOpacity>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  settingsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  label: {
    fontSize: 16,
  },
});

export default SettingsItem;
