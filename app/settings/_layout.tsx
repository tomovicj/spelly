import { Stack } from "expo-router";

function SettingsLayout() {
    return (
        <Stack>
            <Stack.Screen  name="voice" />
        </Stack>
    );
}

export default SettingsLayout;