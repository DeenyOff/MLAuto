import { Redirect, Stack } from "expo-router";

import { AuthLoadingScreen } from "@/components/auth-loading-screen";
import { useAuth } from "@/contexts/auth";

export default function AuthLayout() {
    const { initializing, session } = useAuth();

    if (initializing) {
        return <AuthLoadingScreen />;
    }

    if (session) {
        return <Redirect href="/" />;
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        />
    );
}
