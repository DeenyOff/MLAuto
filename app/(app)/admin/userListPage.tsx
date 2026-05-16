import { Stack } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { UserCard } from "@/components/cards/UserCard";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Spacing, uiStyles } from "@/components/ui/tokens";
import { Colors } from "@/constants/theme";
import { useAdmin } from "@/hooks/use-admin";

export default function UsersScreen() {
    const { users, fetchUsers } = useAdmin();

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

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

            <ScreenContainer scroll>
                <View style={styles.header}>
                    <Text style={styles.title}>Visi vartotojai</Text>

                    <Text style={styles.subtitle}>
                        Bendras vartotoju skaicius: {users?.length ?? 0}
                    </Text>
                </View>

                {users.map((user, index) => (
                    <UserCard
                        key={`${user.email ?? "user"}-${index}`}
                        firstName={user.first_name}
                        lastName={user.last_name}
                        email={user.email}
                        phoneNumber={user.phone_number}
                    />
                ))}
            </ScreenContainer>
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        marginBottom: 28,
    },
    title: {
        ...uiStyles.screenTitle,
        fontSize: 30,
        marginBottom: Spacing.sm,
    },
    subtitle: {
        ...uiStyles.subtitle,
        fontSize: 15,
    },
});
