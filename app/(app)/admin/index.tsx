import { useCallback } from "react";
import { router, Stack, useFocusEffect } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { AdminActionCard } from "@/components/admin/AdminActionCard";
import { BookingCard } from "@/components/cards/BookingCard";
import { StatsCard } from "@/components/cards/StatsCard";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Spacing, uiStyles } from "@/components/ui/tokens";
import { Colors } from "@/constants/theme";
import { useAdmin } from "@/hooks/use-admin";

export default function AdminScreen() {
    const {
        bookingsCount,
        fetchBookingsCount,
        bookings,
        fetchBookings,
        users,
        fetchUsers,
    } = useAdmin();

    useFocusEffect(
        useCallback(() => {
            fetchBookingsCount();
            fetchBookings();
            fetchUsers();
        }, [fetchBookings, fetchBookingsCount, fetchUsers])
    );

    return (
        <>
            <Stack.Screen
                options={{
                    title: "ADMIN PANEL",
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: Colors.background,
                    },
                    headerBackTitle: "Atgal",
                    headerTintColor: Colors.text,
                }}
            />
            <ScreenContainer scroll>
                <Text style={styles.title}>Admin Panel</Text>
                <Text style={styles.subtitle}>
                    Valdykite rezervacijas ir vartotojus
                </Text>

                <View style={styles.statsContainer}>
                    <StatsCard value={bookingsCount} label="Rezervacijos" />
                    <StatsCard value={users.length} label="Vartotojų" />
                </View>

                <View style={styles.section}>
                    <SectionTitle>Greiti veiksmai</SectionTitle>
                    <AdminActionCard
                        title="Vartotojų sąrašas"
                        onPress={() => router.push("/admin/userListPage")}
                    />
                </View>

                <View style={styles.section}>
                    <SectionTitle>Rezervacijų sąrašas</SectionTitle>

                    {bookings?.map((booking) => (
                        <BookingCard
                            key={booking.id}
                            title={booking.service_title ?? "Paslauga"}
                            bookingDate={booking.booking_date}
                            status={booking.status}
                            onPress={() => router.push(`/admin/booking/${booking.id}`)}
                        />
                    ))}
                </View>
            </ScreenContainer>
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        ...uiStyles.screenTitle,
        fontSize: 34,
        marginBottom: Spacing.sm,
    },
    subtitle: {
        ...uiStyles.subtitle,
        marginBottom: Spacing.xxxl,
    },
    statsContainer: {
        flexDirection: "row",
        gap: Spacing.md,
        marginBottom: Spacing.xxxl,
    },
    section: {
        marginBottom: Spacing.xxxl,
    },
});
