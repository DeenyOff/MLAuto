import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,

                tabBarButton: HapticTab,

                tabBarStyle: {
                    backgroundColor: '#121212',
                    borderTopWidth: 0,
                    height: 75,
                    paddingTop: 10,
                    paddingBottom: 10,
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
                        <IconSymbol
                            size={26}
                            name="house.fill"
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
                        <IconSymbol
                            size={26}
                            name="person.fill"
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
                        <IconSymbol
                            size={26}
                            name="gearshape.fill"
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}