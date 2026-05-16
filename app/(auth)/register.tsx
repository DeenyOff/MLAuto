import { useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";

import { router } from "expo-router";

import { AppInput } from "@/components/forms/AppInput";
import { GhostButton, PrimaryButton } from "@/components/ui/Button";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Spacing, uiStyles } from "@/components/ui/tokens";
import { supabase } from "@/services/supabase";

export default function RegisterScreen() {
    // Data that will be transferred to Supabase
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);
    // End data

    async function handleRegister() {
        const normalizedEmail = email.trim();

        if (!normalizedEmail || !password) {
            Alert.alert("Klaida", "Iveskite el. pasta ir slaptazodi.");
            return;
        }

        if (!firstName.trim()) {
            Alert.alert("Klaida", "Ä®veskite vardÄ…");
            return;
        }

        if (!lastName.trim()) {
            Alert.alert("Klaida", "Ä®veskite pavardÄ™");
            return;
        }

        if (!phoneNumber.trim()) {
            Alert.alert("Klaida", "Ä®veskite telefono numerÄ¯");
            return;
        }

        if (!email.trim()) {
            Alert.alert("Klaida", "Ä®veskite el. paÅ¡tÄ…");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Klaida", "SlaptaÅ¾odis per trumpas");
            return;
        }

        setLoading(true);

        const { data, error } = await supabase.auth.signUp({
            email: normalizedEmail,
            password,
            options: {
                data: {
                    // Ð”ÑƒÐ±Ð»Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¾ Ð´Ð»Ñ Ð±Ð¾Ð»ÐµÐµ Ð¿Ñ€Ð¾ÑÑ‚Ð¾Ð³Ð¾ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ð½Ð¸Ñ Ð² SQL, Ð¿ÐµÑ€ÐµÐ¼ÐµÐ½Ð½Ñ‹Ðµ Ð·Ð°Ð¿Ð¸ÑÐ°Ð½Ñ‹ Ð² camelCase Ð° Ð² Ð±Ð°Ð·Ðµ Ð±ÑƒÐ´ÐµÑ‚ snake_case
                    first_name: firstName,
                    last_name: lastName,
                    full_name: firstName + " " + lastName,
                    phone_number: phoneNumber,
                    // phone: phoneNumber
                },
            },
        });

        if (error) {
            Alert.alert("Klaida", error.message);
            return;
        }

        if (data.session) {
            router.replace("/");
            return;
        }

        Alert.alert(
            "Paskyra sukurta",
            "Patvirtinkite el. pasta, tada prisijunkite."
        );
        router.replace("/login");
    }

    return (
        <ScreenContainer safeArea={false} centered contentStyle={styles.container}>
            <Text style={styles.title}>Registracija</Text>

            <AppInput
                placeholder="Vardas"
                autoCapitalize="none"
                autoComplete="name"
                value={firstName}
                onChangeText={setFirstName}
                inputStyle={styles.input}
            />

            <AppInput
                placeholder="PavardÄ—"
                autoCapitalize="none"
                autoComplete="name"
                value={lastName}
                onChangeText={setLastName}
                inputStyle={styles.input}
            />

            <AppInput
                placeholder="Tel. numeris"
                autoComplete="tel"
                keyboardType="numeric"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                inputStyle={styles.input}
            />

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
                title="Registruotis"
                disabled={loading}
                loading={loading}
                onPress={handleRegister}
            />

            <GhostButton title="Jau turiu paskyra" onPress={() => router.push("/login")} />
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
});
