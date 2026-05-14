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

import {useEffect} from "react";

import {useAdmin} from "@/hooks/use-admin";
import { UsersType } from "@/services/admin";

export default function UsersScreen() {

    const { users, fetchUsers } = useAdmin();

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Vartotojai",
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: Colors.background,
                    },
                    headerBackTitle: "Atgal",
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
                            Bendras vartotoju skaicius: {users?.length ?? 0}
                        </Text>
                    </View>

                    {users.map((user) => (
                        <UserCard
                            first_name={user.first_name}
                            last_name={user.last_name}
                            email={user.email}
                            phone_number={user.phone_number}
                        />
                    ))}
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

function UserCard({
                      first_name,
                      last_name,
                      email,
                      phone_number,
                  }: UsersType) {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={styles.userCard}
        >
            <View style={styles.userLeft}>
                <Text
                    style={styles.userName}
                    numberOfLines={1}
                >
                    {first_name ?? ""} {last_name ?? ""}
                </Text>

                <Text
                    style={styles.userInfo}
                    numberOfLines={1}
                >
                    {email}
                </Text>

                <Text style={styles.userInfo}>
                    {phone_number}
                </Text>
            </View>
        </TouchableOpacity>
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
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginBottom: 12,

        borderWidth: 1,
        borderColor: "#242424",

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    userLeft: {
        flex: 1,
        paddingRight: 12,
    },

    userName: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 4,
    },

    userInfo: {
        color: Colors.secondary,
        fontSize: 13,
        marginBottom: 2,
    },

    roleBadge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 999,
        alignSelf: "flex-start",
    },

    adminBadge: {
        backgroundColor: "#D97706",
    },

    clientBadge: {
        backgroundColor: Colors.accent,
    },

    roleText: {
        color: "white",
        fontSize: 11,
        fontWeight: "700",
    },
});
