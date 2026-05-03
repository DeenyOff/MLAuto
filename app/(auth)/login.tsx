import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { router } from "expo-router";

import { Colors } from "@/constants/theme";
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
        <View style={styles.container}>
            <Text style={styles.title}>Prisijungimas</Text>

            <TextInput
                placeholder="El. pastas"
                placeholderTextColor="#777"
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />

            <TextInput
                placeholder="Slaptazodis"
                placeholderTextColor="#777"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.input}
            />

            <TouchableOpacity
                disabled={loading}
                style={[styles.button, loading && styles.disabledButton]}
                onPress={handleLogin}
            >
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text style={styles.buttonText}>Prisijungti</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/register")}>
                <Text style={styles.link}>Sukurti paskyra</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    title: {
        color: Colors.text,
        fontSize: 34,
        fontWeight: "700",
        marginBottom: 40,
    },
    input: {
        backgroundColor: Colors.card,
        color: Colors.text,
        padding: 18,
        borderRadius: 12,
        marginBottom: 18,
        fontSize: 16,
    },
    button: {
        backgroundColor: Colors.accent,
        padding: 18,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },
    disabledButton: {
        opacity: 0.7,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "700",
    },
    link: {
        color: Colors.accent,
        textAlign: "center",
        marginTop: 24,
        fontSize: 16,
    },
});
