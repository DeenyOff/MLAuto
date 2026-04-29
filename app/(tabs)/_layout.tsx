import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#121212",
                },
                tabBarActiveTintColor: "#E9021E",
                tabBarInactiveTintColor: "#aaa",
            }}
        >
            <Tabs.Screen name="index" options={{ title: "Pagrindinis" }} />
            <Tabs.Screen name="profile" options={{ title: "Profilis" }} />
            <Tabs.Screen name="settings" options={{ title: "Nustatymai" }} />
        </Tabs>
    );
}
