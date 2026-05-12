import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {

    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,

                tabBarButton: HapticTab,

                tabBarStyle: {
                    backgroundColor: '#121212',
                    borderTopWidth: 0,
                    height: 60 + insets.bottom,
                    paddingTop: 10,
                    paddingBottom: insets.bottom,
                },

                tabBarActiveTintColor: '#E9021E',
                tabBarInactiveTintColor: '#888',

                tabBarLabelStyle: {
                    // padding: 5,
                    fontSize: 12,
                    fontWeight: 'normal',
                    marginBottom: 8,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Pagrindinis',

                    tabBarIcon: ({ color }) => (
                        // <IconSymbol
                        //     size={26}
                        //     name="house.fill"
                        //     color={color}
                        // />
                        <Ionicons
                            name={"home"}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profilis',

                    tabBarIcon: ({ color }) => (
                        // <IconSymbol
                        //     size={26}
                        //     name="person.fill"
                        //     color={color}
                        // />
                        <Ionicons
                            name={"person"}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Nustatymai',

                    tabBarIcon: ({ color }) => (
                        // <IconSymbol
                        //     size={26}
                        //     name="gearshape.fill"
                        //     color={color}
                        // />
                        <Ionicons
                            name={"settings"}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}