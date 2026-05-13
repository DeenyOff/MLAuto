import { Stack } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/constants/theme";

type UserCardProps = {
    name: string;
    email: string;
    phone: string;
    role: "admin" | "client";
};

function UserCard({
                      name,
                      email,
                      phone,
                      role,
                  }: UserCardProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={styles.userCard}
        >
            <View style={styles.userTopRow}>
                <View>
                    <Text style={styles.userName}>
                        {name}
                    </Text>

                    <Text style={styles.userEmail}>
                        {email}
                    </Text>
                </View>

                <View
                    style={[
                        styles.roleBadge,
                        role === "admin"
                            ? styles.adminBadge
                            : styles.clientBadge,
                    ]}
                >
                    <Text style={styles.roleText}>
                        {role.toUpperCase()}
                    </Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>
                    Telefono numeris
                </Text>

                <Text style={styles.infoValue}>
                    {phone}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

export default function UsersScreen() {

    // Пока мок данные
    const users = [
        {
            id: "1",
            name: "Denis Scek",
            email: "denis@gmail.com",
            phone: "+37060000000",
            role: "admin" as const,
        },
        {
            id: "2",
            name: "Jonas Jonaitis",
            email: "jonas@gmail.com",
            phone: "+37061111111",
            role: "client" as const,
        },
        {
            id: "3",
            name: "Petras Petrauskas",
            email: "petras@gmail.com",
            phone: "+37062222222",
            role: "client" as const,
        },
    ];

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Vartotojai",
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: Colors.background,
                    },
                    headerTintColor: Colors.text,
                }}
            />

            <SafeAreaView style={styles.safeArea}>
                <ScrollView
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            Visi vartotojai
                        </Text>

                        <Text style={styles.subtitle}>
                            Bendras vartotoju skaicius: {users.length}
                        </Text>
                    </View>

                    {users.map((user) => (
                        <UserCard
                            key={user.id}
                            name={user.name}
                            email={user.email}
                            phone={user.phone}
                            role={user.role}
                        />
                    ))}
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    content: {
        padding: 20,
        paddingBottom: 40,
    },

    header: {
        marginBottom: 28,
    },

    title: {
        color: Colors.text,
        fontSize: 30,
        fontWeight: "700",
        marginBottom: 6,
    },

    subtitle: {
        color: Colors.secondary,
        fontSize: 15,
    },

    userCard: {
        backgroundColor: Colors.card,
        borderRadius: 22,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#242424",
    },

    userTopRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },

    userName: {
        color: Colors.text,
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 6,
    },

    userEmail: {
        color: Colors.secondary,
        fontSize: 14,
    },

    roleBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
    },

    adminBadge: {
        backgroundColor: "#D97706",
    },

    clientBadge: {
        backgroundColor: Colors.accent,
    },

    roleText: {
        color: "white",
        fontSize: 12,
        fontWeight: "700",
    },

    divider: {
        height: 1,
        backgroundColor: "#2A2A2A",
        marginVertical: 18,
    },

    infoRow: {
        gap: 6,
    },

    infoLabel: {
        color: Colors.secondary,
        fontSize: 13,
    },

    infoValue: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: "600",
    },
});
