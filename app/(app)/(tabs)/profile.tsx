import { useCallback } from "react";

import { useFocusEffect } from "expo-router";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Colors } from "@/constants/theme";
import { useAuth } from "@/contexts/auth";
import { Booking } from "@/services/booking";
import { useBooking } from "@/hooks/use-booking";
import { useUser } from "@/hooks/use-user";

export default function ProfileScreen() {

    const { session, signOut } = useAuth();
    const {user, avatarLetter, displayName } = useUser();
    const { reservations, loading, fetchReservations } = useBooking();

    useFocusEffect(
        useCallback(() => {
            fetchReservations().catch((error) => {
                Alert.alert(
                    "Klaida",
                    error instanceof Error
                        ? error.message
                        : "Nepavyko gauti rezervaciju."
                );
            });
        }, [fetchReservations])
    );

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
                paddingBottom: 100,
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

            <View style={styles.card}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Mano rezervacijos</Text>

                    {loading ? (
                        <ActivityIndicator color={Colors.accent} />
                    ) : null}
                </View>

                {!loading && reservations.length === 0 ? (
                    <Text style={styles.emptyText}>Rezervaciju dar nera.</Text>
                ) : null}

                {reservations.map((reservation) => (
                    <ReservationItem
                        key={reservation.id}
                        reservation={reservation}
                    />
                ))}
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Atsijungti</Text>
            </TouchableOpacity>
        </ScrollView>
    );
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

function ReservationItem({ reservation }: { reservation: Booking }) {
    return (
        <View style={styles.reservationItem}>
            <Text style={styles.reservationTitle}>
                {reservation.service_title ?? reservation.service_id}
            </Text>
            <Text style={styles.reservationMeta}>
                {formatDate(reservation.booking_date)}
            </Text>
            <Text style={styles.status}>{reservation.status}</Text>
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
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
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
    emptyText: {
        color: Colors.secondary,
        fontSize: 15,
    },
    reservationItem: {
        borderTopColor: "#2A2A2A",
        borderTopWidth: 1,
        paddingTop: 14,
        marginTop: 14,
    },
    reservationTitle: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 6,
    },
    reservationMeta: {
        color: Colors.secondary,
        marginBottom: 8,
    },
    status: {
        alignSelf: "flex-start",
        color: Colors.accent,
        fontWeight: "700",
        textTransform: "uppercase",
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
