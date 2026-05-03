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

        setLoading(true);

        const { data, error } = await supabase.auth.signUp({
            email: normalizedEmail,
            password,
            phone: phoneNumber,
            options: {
                data: {
                    // Дублировано для более простого использования в SQL, переменные записаны в camelCase а в базе будет snake_case
                    first_name: firstName,
                    last_name: lastName,
                    // phone: phoneNumber
                }
            }
        });
        console.log(JSON.stringify(data.user, null, 2));
        setLoading(false);

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
        <View style={styles.container}>
            <Text style={styles.title}>Registracija</Text>

            <TextInput
                placeholder="Vardas"
                placeholderTextColor="#777"
                autoCapitalize="none"
                autoComplete="name"
                value={firstName}
                onChangeText={setFirstName}
                style={styles.input}
            />

            <TextInput
                placeholder="Pavardė"
                placeholderTextColor="#777"
                autoCapitalize="none"
                autoComplete="name"
                value={lastName}
                onChangeText={setLastName}
                style={styles.input}
            />

            <TextInput
                placeholder="Tel. numeris"
                placeholderTextColor="#777"
                autoComplete="tel"
                keyboardType="numeric"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                style={styles.input}
            />

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
                onPress={handleRegister}
            >
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text style={styles.buttonText}>Registruotis</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/login")}>
                <Text style={styles.link}>Jau turiu paskyra</Text>
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
