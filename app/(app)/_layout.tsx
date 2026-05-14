import { Redirect, Stack } from "expo-router";

import { AuthLoadingScreen } from "@/components/auth-loading-screen";
import { useAuth } from "@/contexts/auth";

export default function AppLayout() {
    const { initializing, session } = useAuth();

    if (initializing) {
        return <AuthLoadingScreen />;
    }

    if (!session) {
        return <Redirect href="/login" />;
    }

    return (
        <Stack>
            <Stack.Screen
                name="(tabs)"
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="service/[id]"
                options={{
                    headerShown: true,
                }}
            />

        </Stack>
    );
}
