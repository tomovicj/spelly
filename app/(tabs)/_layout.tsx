import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <Tabs>
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
