import { useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";

import { router } from "expo-router";

import { AppInput } from "@/components/forms/AppInput";
import { GhostButton, PrimaryButton } from "@/components/ui/Button";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Spacing, uiStyles } from "@/components/ui/tokens";
import { supabase } from "@/services/supabase";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin() {
        const normalizedEmail = email.trim();

        if (!normalizedEmail || !password) {
            Alert.alert("Klaida", "Iveskite el. pasta ir slaptazodi.");
            return;
        }

        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email: normalizedEmail,
            password,
        });

        setLoading(false);

        if (error) {
            Alert.alert("Klaida", error.message);
            return;
        }

        router.replace("/");
    }

    return (
        <ScreenContainer safeArea={false} centered contentStyle={styles.container}>
            <Text style={styles.title}>Prisijungimas</Text>

            <AppInput
                placeholder="El. pastas"
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                inputStyle={styles.input}
            />

            <AppInput
                placeholder="Slaptazodis"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                inputStyle={styles.input}
            />

            <PrimaryButton
                title="Prisijungti"
                disabled={loading}
                loading={loading}
                onPress={handleLogin}
                style={styles.button}
            />

            <GhostButton title="Sukurti paskyra" onPress={() => router.push("/register")} />
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
    },
    title: {
        ...uiStyles.screenTitle,
        fontSize: 34,
        marginBottom: 40,
    },
    input: {
        marginBottom: Spacing.lg,
    },
    button: {
        marginTop: 10,
    },
});
