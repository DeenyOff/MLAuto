import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";

import { Colors } from "@/constants/theme";

export default function ProfileScreen() {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{
                paddingBottom: 40,
            }}
        >
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>M</Text>
                </View>

                <Text style={styles.name}>
                    Mantas Jonaitis
                </Text>

                <Text style={styles.email}>
                    mantas@email.com
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>
                    Profilio informacija
                </Text>

                <ProfileRow
                    title="Telefono numeris"
                    value="+370 60000000"
                />

                <ProfileRow
                    title="Automobilis"
                    value="BMW M240"
                />

                <ProfileRow
                    title="Registracijos data"
                    value="2025-01-12"
                />
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>
                    Rezervacijos
                </Text>

                <MenuButton title="Aktyvios rezervacijos" />
                <MenuButton title="Vizitų istorija" />
            </View>

            <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.logoutText}>
                    Atsijungti
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

function ProfileRow({
                        title,
                        value,
                    }: {
    title: string;
    value: string;
}) {
    return (
        <View style={styles.row}>
            <Text style={styles.rowTitle}>
                {title}
            </Text>

            <Text style={styles.rowValue}>
                {value}
            </Text>
        </View>
    );
}

function MenuButton({
                        title,
                    }: {
    title: string;
}) {
    return (
        <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuButtonText}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingTop: 70,
        paddingHorizontal: 20,
    },

    header: {
        alignItems: "center",
        marginBottom: 30,
    },

    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: Colors.accent,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
    },

    avatarText: {
        color: "white",
        fontSize: 34,
        fontWeight: "700",
    },

    name: {
        color: Colors.text,
        fontSize: 26,
        fontWeight: "700",
    },

    email: {
        color: Colors.secondary,
        marginTop: 5,
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

    row: {
        marginBottom: 16,
    },

    rowTitle: {
        color: Colors.secondary,
        marginBottom: 4,
    },

    rowValue: {
        color: Colors.text,
        fontSize: 16,
    },

    menuButton: {
        backgroundColor: "#232323",
        padding: 16,
        borderRadius: 6,
        marginBottom: 12,
    },

    menuButtonText: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: "600",
    },

    logoutButton: {
        backgroundColor: Colors.accent,
        padding: 18,
        borderRadius: 6,
        alignItems: "center",
    },

    logoutText: {
        color: "white",
        fontSize: 16,
        fontWeight: "700",
    },
});