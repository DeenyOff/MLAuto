import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";

import { Colors } from "@/constants/theme";

export default function SettingsScreen() {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{
                paddingBottom: 40,
            }}
        >
            <Text style={styles.title}>
                Nustatymai
            </Text>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>
                    Programėlė
                </Text>

                <SettingsButton title="Privatumo nustatymai" />
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>
                    Pagalba
                </Text>

                <SettingsButton title="Kontaktai" />
                <SettingsButton title="DUK" />
                <SettingsButton title="Pagalbos centras" />
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>
                    Informacija
                </Text>

                <InfoRow title="Versija" value="1.0.0" />
                <InfoRow title="Platforma" value="Expo React Native" />
            </View>
        </ScrollView>
    );
}

function SettingsButton({
                            title,
                        }: {
    title: string;
}) {
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

function InfoRow({
                     title,
                     value,
                 }: {
    title: string;
    value: string;
}) {
    return (
        <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>
                {title}
            </Text>

            <Text style={styles.infoValue}>
                {value}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingTop: 70,
        paddingHorizontal: 20,
    },

    title: {
        color: Colors.text,
        fontSize: 32,
        fontWeight: "700",
        marginBottom: 30,
    },

    card: {
        backgroundColor: Colors.card,
        borderRadius: 6,
        padding: 18,
        marginBottom: 20,
    },

    sectionTitle: {
        color: Colors.text,
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 20,
    },

    button: {
        backgroundColor: "#232323",
        padding: 16,
        borderRadius: 6,
        marginBottom: 12,
    },

    buttonText: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: "600",
    },

    infoRow: {
        marginBottom: 14,
    },

    infoTitle: {
        color: Colors.secondary,
        marginBottom: 4,
    },

    infoValue: {
        color: Colors.text,
        fontSize: 16,
    },
});