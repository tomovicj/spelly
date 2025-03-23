import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { SettingsContext } from "@/context/SettingsContext";
import { useColors } from "@/context/ColorsContext";

type SettingsItemProps = {
  id: string;
  label: string;
  type: "switch" | "single_choice";
};

const SettingsItem = (props: SettingsItemProps) => {
  const { settings, updateSettings } = useContext(SettingsContext);
  const colors = useColors();

  const toggleSwitch = (key: string) => {
    updateSettings({ [key]: !settings[key] as boolean });
  };

  if (props.type === "single_choice") {
    return (
      <View
        style={{ ...styles.settingsItem, borderBottomColor: colors.secondary }}
      >
        <Text style={{ ...styles.label, color: colors.neutral }}>
          {props.label}
        </Text>
      </View>
    );
  }

  if (props.type === "switch") {
    return (
      <TouchableOpacity
        style={{ ...styles.settingsItem, borderBottomColor: colors.secondary }}
        onPress={() => toggleSwitch(props.id)}
      >
        <Text style={{ ...styles.label, color: colors.neutral }}>
          {props.label}
        </Text>
        <Switch
          trackColor={{ false: colors.neutral, true: colors.accent }}
          thumbColor={colors.secondary}
          value={settings[props.id] as boolean}
          onValueChange={() => toggleSwitch(props.id)}
        />
      </TouchableOpacity>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  settingsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 16,
  },
});

export default SettingsItem;
