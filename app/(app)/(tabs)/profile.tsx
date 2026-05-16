import { useCallback } from "react";

import { useFocusEffect } from "expo-router";
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { DangerButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/StateViews";
import { InfoRow } from "@/components/ui/InfoRow";
import { ReservationCard } from "@/components/cards/ReservationCard";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Radius, Spacing } from "@/components/ui/tokens";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/contexts/auth";
import { useBooking } from "@/hooks/use-booking";
import { useUserInfo } from "@/hooks/use-user";

export default function ProfileScreen() {
    const { session, signOut } = useAuth();
    const { user, avatarLetter, displayName } = useUserInfo();
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
        <ScreenContainer scroll safeArea={false} contentStyle={styles.content}>
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{avatarLetter}</Text>
                </View>

                <Text style={styles.name}>{displayName}</Text>
                <Text style={styles.email}>{user?.email ?? "Nera el. pasto"}</Text>
            </View>

            <Card style={styles.card}>
                <SectionTitle>Profilio informacija</SectionTitle>

                <InfoRow title="Vartotojo ID" value={user?.id ?? "-"} />
                <InfoRow title="El. pastas" value={user?.email ?? "-"} />
                <InfoRow
                    title="Sesijos galiojimas"
                    value={formatExpiresAt(session?.expires_at)}
                />
                <InfoRow
                    title="Registracijos data"
                    value={formatDate(user?.created_at)}
                />
            </Card>

            <Card style={styles.card}>
                <View style={styles.sectionHeader}>
                    <SectionTitle>Mano rezervacijos</SectionTitle>

                    {loading ? <ActivityIndicator color={Colors.accent} /> : null}
                </View>

                {!loading && reservations.length === 0 ? (
                    <EmptyState message="Rezervaciju dar nera." />
                ) : null}

                {reservations.map((reservation) => (
                    <ReservationCard
                        key={reservation.id}
                        reservation={reservation}
                        formatDate={formatDate}
                    />
                ))}
            </Card>

            <DangerButton title="Atsijungti" onPress={handleLogout} />
        </ScreenContainer>
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

const styles = StyleSheet.create({
    content: {
        paddingTop: 70,
        paddingBottom: 100,
    },
    header: {
        alignItems: "center",
        marginBottom: Spacing.xxxl,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: Colors.accent,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: Spacing.md,
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
        marginBottom: Spacing.xl,
        borderRadius: Radius.lg,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: Spacing.xs,
    },
});
