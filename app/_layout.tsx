import {
    DarkTheme,
    ThemeProvider,
} from "@react-navigation/native";

import { Stack } from "expo-router";

import { StatusBar } from "expo-status-bar";

import { AuthProvider } from "@/contexts/auth";

export default function RootLayout() {
    return (
        <ThemeProvider value={DarkTheme}>
            <AuthProvider>
                <Stack
                    screenOptions={{
                        headerShown: false,
                    }}
                />
            </AuthProvider>

            <StatusBar style="light" />
        </ThemeProvider>
    );
}
