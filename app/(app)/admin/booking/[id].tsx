import { useEffect, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";

import {
    Linking,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { AppInput } from "@/components/forms/AppInput";
import { DangerButton, PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { InfoRow } from "@/components/ui/InfoRow";
import { LoadingState } from "@/components/ui/StateViews";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Borders, Spacing, uiStyles } from "@/components/ui/tokens";
import { Colors } from "@/constants/theme";
import { useAdmin } from "@/hooks/use-admin";
import { getBookingById } from "@/services/admin";

export default function BookingDetailsScreen() {
    const { id } = useLocalSearchParams();
    const { changeBookingStatus, removeBooking, changeBookingDate } = useAdmin();
    const [booking, setBooking] = useState<any>(null);
    const [editedDate, setEditedDate] = useState("");

    useEffect(() => {
        async function loadBooking() {
            const data = await getBookingById(String(id));
            setBooking(data);
        }

        loadBooking();
    }, [id]);

    useEffect(() => {
        if (!booking?.booking_date) {
            return;
        }

        const date = new Date(booking.booking_date);

        const formatted =
            date.getFullYear() +
            "-" +
            String(date.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(date.getDate()).padStart(2, "0") +
            " " +
            String(date.getHours()).padStart(2, "0") +
            ":" +
            String(date.getMinutes()).padStart(2, "0");

        setEditedDate(formatted);
    }, [booking]);

    if (!booking) {
        return <LoadingState />;
    }

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Rezervacija",
                    headerBackTitle: "Atgal",
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: Colors.background,
                    },
                    headerTintColor: Colors.text,
                }}
            />

            <ScreenContainer scroll>
                <Card style={styles.card}>
                    <View style={styles.topRow}>
                        <View style={styles.headerContent}>
                            <Text style={styles.serviceTitle}>{booking.service.title}</Text>

                            <Text style={styles.bookingDate}>
                                {new Date(booking.booking_date).toLocaleString("lt-LT", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </Text>
                        </View>

                        <StatusBadge status={booking.status} />
                    </View>

                    <View style={styles.divider} />

                    <SectionTitle>Kliento informacija</SectionTitle>

                    <InfoRow title="Vardas" value={booking.user.first_name} />
                    <InfoRow title="El. paÅ¡tas" value={booking.user.email} />
                    <InfoRow title="Telefonas" value={booking.user.phone_number} />
                </Card>

                <Card style={styles.card}>
                    <SectionTitle>Rezervacijos valdymas</SectionTitle>

                    <PrimaryButton
                        title="Keisti statusa"
                        onPress={() => changeBookingStatus(booking.id, "completed")}
                        style={styles.actionButton}
                    />

                    <Text style={styles.infoLabel}>Nauja data ir laikas</Text>
                    <AppInput
                        value={editedDate}
                        onChangeText={setEditedDate}
                        placeholder="2026-05-20 14:00"
                        placeholderTextColor={Colors.secondary}
                        autoCapitalize="none"
                        keyboardType="numbers-and-punctuation"
                        inputStyle={styles.input}
                    />

                    <Text style={styles.helperText}>Formatas: YYYY-MM-DD HH:MM</Text>

                    <SecondaryButton
                        title="Susisiekti su klientu"
                        onPress={() => {
                            if (!booking.user.phone_number) {
                                return;
                            }

                            Linking.openURL(`tel:${booking.user.phone_number}`);
                        }}
                        style={styles.actionButton}
                    />

                    <SecondaryButton
                        title="Redaguoti data"
                        onPress={async () => {
                            if (!editedDate.trim()) {
                                return;
                            }

                            const parsedDate = new Date(editedDate.replace(" ", "T"));

                            if (Number.isNaN(parsedDate.getTime())) {
                                return;
                            }

                            await changeBookingDate(booking.id, parsedDate.toISOString());

                            setBooking({
                                ...booking,
                                booking_date: editedDate,
                            });
                        }}
                        style={styles.actionButton}
                    />

                    <DangerButton
                        title="Ištrinti rezervacija"
                        onPress={async () => {
                            await removeBooking(booking.id);
                            router.back();
                        }}
                    />
                </Card>
            </ScreenContainer>
        </>
    );
}

const styles = StyleSheet.create({
    card: {
        marginBottom: Spacing.xl,
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: Spacing.md,
    },
    headerContent: {
        flex: 1,
    },
    serviceTitle: {
        ...uiStyles.screenTitle,
        fontSize: 26,
        marginBottom: Spacing.sm,
    },
    bookingDate: {
        color: Colors.secondary,
        fontSize: 15,
    },
    divider: {
        height: 1,
        backgroundColor: Borders.default,
        marginVertical: Spacing.xxl,
    },
    infoLabel: {
        color: Colors.secondary,
        fontSize: 13,
        marginBottom: Spacing.sm,
    },
    input: {
        marginBottom: Spacing.lg,
    },
    helperText: {
        color: Colors.secondary,
        fontSize: 12,
        marginBottom: Spacing.lg,
        marginTop: -10,
    },
    actionButton: {
        marginBottom: Spacing.md,
    },
});
