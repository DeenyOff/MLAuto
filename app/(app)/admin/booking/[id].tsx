import { useEffect, useState } from "react";
import {router, Stack, useLocalSearchParams} from "expo-router";

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Linking
} from "react-native";

import { getBookingById } from "@/services/admin";
import {Colors} from "@/constants/theme";
import {SafeAreaView} from "react-native-safe-area-context";
import {useAdmin} from "@/hooks/use-admin";

export default function BookingDetailsScreen() {

    const { id } = useLocalSearchParams();

    const { changeBookingStatus, removeBooking, changeBookingDate } = useAdmin();

    const [booking, setBooking] = useState<any>(null);

    const [editedDate, setEditedDate] = useState("");

    useEffect(() => {
        async function loadBooking() {

            const data = await getBookingById(
                String(id)
            );

            setBooking(data);
        }

        loadBooking();
    }, []);

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
        return <Text style={styles.serviceTitle}>Loading...</Text>;
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

            <SafeAreaView style={styles.safeArea}>
                <ScrollView
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                >

                    <View style={styles.mainCard}>

                        <View style={styles.topRow}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.serviceTitle}>
                                    {booking.service.title}
                                </Text>

                                <Text style={styles.bookingDate}>
                                    {new Date(
                                        booking.booking_date
                                    ).toLocaleString("lt-LT", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </Text>
                            </View>

                            <View style={styles.statusBadge}>
                                <Text style={styles.statusText}>
                                    {booking.status}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <Text style={styles.sectionTitle}>
                            Kliento informacija
                        </Text>

                        <View style={styles.infoBlock}>
                            <Text style={styles.infoLabel}>
                                Vardas
                            </Text>

                            <Text style={styles.infoValue}>
                                {booking.user.first_name}
                            </Text>
                        </View>

                        <View style={styles.infoBlock}>
                            <Text style={styles.infoLabel}>
                                El. paštas
                            </Text>

                            <Text style={styles.infoValue}>
                                {booking.user.email}
                            </Text>
                        </View>

                        <View style={styles.infoBlock}>
                            <Text style={styles.infoLabel}>
                                Telefonas
                            </Text>

                            <Text style={styles.infoValue}>
                                {booking.user.phone_number}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.actionsCard}>

                        <Text style={styles.sectionTitle}>
                            Rezervacijos valdymas
                        </Text>

                        <TouchableOpacity
                            style={styles.primaryButton}
                            activeOpacity={0.7}
                            onPress={() =>
                                changeBookingStatus(booking.id, "completed")
                            }
                        >
                            <Text style={styles.primaryButtonText}>
                                Keisti statusa
                            </Text>
                        </TouchableOpacity>

                        <Text style={styles.infoLabel}>
                            Nauja data ir laikas
                        </Text>
                        <TextInput
                            value={editedDate}
                            onChangeText={setEditedDate}
                            placeholder="2026-05-20 14:00"
                            placeholderTextColor={Colors.secondary}
                            style={styles.input}
                            autoCapitalize="none"
                            keyboardType="numbers-and-punctuation"
                        />

                        <Text style={styles.helperText}>
                            Formatas: YYYY-MM-DD HH:MM
                        </Text>

                        <TouchableOpacity
                            style={styles.secondaryButton}
                            activeOpacity={0.7}
                            onPress={() => {
                                if (!booking.user.phone_number) {
                                    return;
                                }

                                Linking.openURL(
                                    `tel:${booking.user.phone_number}`
                                );
                            }}
                        >
                            <Text style={styles.secondaryButtonText}>
                                Susisiekti su klientu
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.secondaryButton}
                            activeOpacity={0.7}
                            onPress={async () => {

                                if (!editedDate.trim()) {
                                    return;
                                }

                                const parsedDate = new Date(
                                    editedDate.replace(" ", "T")
                                );

                                if (Number.isNaN(parsedDate.getTime())) {
                                    return;
                                }

                                await changeBookingDate(
                                    booking.id,
                                    parsedDate.toISOString()
                                );

                                setBooking({
                                    ...booking,
                                    booking_date: editedDate,
                                });
                            }}
                        >
                            <Text style={styles.secondaryButtonText}>
                                Redaguoti data
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.dangerButton}
                            activeOpacity={0.7}
                            onPress={async () => {
                                await removeBooking(booking.id);

                                router.back();
                            }}
                        >
                            <Text style={styles.dangerButtonText}>
                                Ištrinti rezervacija
                            </Text>
                        </TouchableOpacity>

                    </View>

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

    mainCard: {
        backgroundColor: Colors.card,
        borderRadius: 28,
        padding: 22,
        marginBottom: 20,

        borderWidth: 1,
        borderColor: "#262626",
    },

    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },

    serviceTitle: {
        color: Colors.text,
        fontSize: 26,
        fontWeight: "700",
        marginBottom: 8,
    },

    bookingDate: {
        color: Colors.secondary,
        fontSize: 15,
    },

    statusBadge: {
        backgroundColor: "rgba(0,255,120,0.15)",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 999,
    },

    statusText: {
        color: "#4ADE80",
        fontSize: 12,
        fontWeight: "700",
        textTransform: "uppercase",
    },

    divider: {
        height: 1,
        backgroundColor: "#262626",
        marginVertical: 22,
    },

    sectionTitle: {
        color: Colors.text,
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 18,
    },

    infoBlock: {
        marginBottom: 16,
    },

    infoLabel: {
        color: Colors.secondary,
        fontSize: 13,
        marginBottom: 6,
    },

    infoValue: {
        color: Colors.text,
        fontSize: 17,
        fontWeight: "600",
    },

    actionsCard: {
        backgroundColor: Colors.card,
        borderRadius: 28,
        padding: 22,

        borderWidth: 1,
        borderColor: "#262626",
    },

    primaryButton: {
        backgroundColor: Colors.accent,
        borderRadius: 18,
        paddingVertical: 18,
        alignItems: "center",
        marginBottom: 14,
    },

    primaryButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "700",
    },

    secondaryButton: {
        backgroundColor: "#1B1B1B",
        borderRadius: 18,
        paddingVertical: 18,
        alignItems: "center",
        marginBottom: 14,

        borderWidth: 1,
        borderColor: "#2E2E2E",
    },

    secondaryButtonText: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: "600",
    },

    dangerButton: {
        backgroundColor: "rgba(255,60,60,0.15)",
        borderRadius: 18,
        paddingVertical: 18,
        alignItems: "center",

        borderWidth: 1,
        borderColor: "rgba(255,60,60,0.2)",
    },

    dangerButtonText: {
        color: "#FF5C5C",
        fontSize: 16,
        fontWeight: "700",
    },
    input: {
        backgroundColor: "#1B1B1B",
        borderRadius: 16,
        padding: 16,
        color: Colors.text,
        marginBottom: 16,

        borderWidth: 1,
        borderColor: "#2A2A2A",
    },
    helperText: {
        color: Colors.secondary,
        fontSize: 12,
        marginBottom: 18,
        marginTop: -10,
    },
});