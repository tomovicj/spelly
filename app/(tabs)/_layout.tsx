import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColors } from "@/context/ColorsContext";

export default function RootLayout() {
  const colors = useColors();
  return (
    <Tabs screenOptions={{tabBarActiveTintColor: colors.secondary, tabBarInactiveTintColor: colors.neutral, tabBarStyle: {backgroundColor: colors.primary, borderColor: colors.secondary}}}>
      <Tabs.Screen
        name="spell"
        options={{
          title: "Spelling",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="spellcheck" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
