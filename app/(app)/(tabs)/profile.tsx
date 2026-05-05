import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Colors } from "@/constants/theme";
import { useAuth } from "@/contexts/auth";
import { useUser } from "@/hooks/use-user";

export default function ProfileScreen() {

    const { session, signOut } = useAuth();
    const {user, avatarLetter, displayName } = useUser();

    async function handleLogout() {
        try {
            await signOut();
        } catch (error) {
            Alert.alert(
                "Klaida",
                error instanceof Error ? error.message : "Nepavyko atsijungti."
            );
        }
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{
                paddingBottom: 40,
            }}
        >
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{avatarLetter}</Text>
                </View>

                <Text style={styles.name}>{displayName}</Text>
                <Text style={styles.email}>{user?.email ?? "Nera el. pasto"}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Profilio informacija</Text>

                <ProfileRow title="Vartotojo ID" value={user?.id ?? "-"} />
                <ProfileRow title="El. pastas" value={user?.email ?? "-"} />
                <ProfileRow
                    title="Sesijos galiojimas"
                    value={formatExpiresAt(session?.expires_at)}
                />
                <ProfileRow
                    title="Registracijos data"
                    value={formatDate(user?.created_at)}
                />
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Atsijungti</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

function getMetadataValue(
    metadata: Record<string, unknown>,
    keys: string[]
): string | undefined {
    for (const key of keys) {
        const value = metadata[key];

        if (typeof value === "string" && value.trim()) {
            return value;
        }
    }

    return undefined;
}

function formatExpiresAt(expiresAt?: number) {
    if (!expiresAt) {
        return "-";
    }

    return formatDate(new Date(expiresAt * 1000).toISOString());
}

function formatDate(value?: string) {
    if (!value) {
        return "-";
    }

    return new Intl.DateTimeFormat("lt-LT", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(value));
}

function formatMetadataValue(value: unknown) {
    if (typeof value === "string") {
        return value;
    }

    if (typeof value === "number" || typeof value === "boolean") {
        return String(value);
    }

    return JSON.stringify(value);
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
            <Text style={styles.rowTitle}>{title}</Text>
            <Text style={styles.rowValue}>{value}</Text>
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
        textAlign: "center",
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
