import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";

import { router } from "expo-router";

import { supabase } from "@/services/supabase";
import { Colors } from "@/constants/theme";

export default function RegisterScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] =
        useState("");

    async function handleRegister() {
        const { error } =
            await supabase.auth.signUp({
                email,
                password,
            });

        if (error) {
            Alert.alert("Klaida", error.message);
            return;
        }

        Alert.alert(
            "Sėkmė",
            "Paskyra sukurta"
        );

        router.replace("/login");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Registracija
            </Text>

            <TextInput
                placeholder="El. paštas"
                placeholderTextColor="#777"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />

            <TextInput
                placeholder="Slaptažodis"
                placeholderTextColor="#777"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.input}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleRegister}
            >
                <Text style={styles.buttonText}>
                    Registruotis
                </Text>
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
    },

    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "700",
    },
});