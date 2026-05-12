import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/constants/theme";

import { Booking } from "@/services/booking";

export default function AdminScreen() {

    const todayRezervationsAmmount=0;

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>Admin Panelė</Text>
                <Text style={styles.subtitle}>
                    Valdykite rezervacijas ir vartotojus
                </Text>

                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>12</Text>
                        <Text style={styles.statLabel}>Rezervacijos</Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>4</Text>
                        <Text style={styles.statLabel}>Laukiama</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Greiti veiksmai</Text>

                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionButtonText}>
                            Peržiūrėti rezervacijas
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionButtonText}>
                            Vartotojų sąrašas
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionButtonText}>
                            Siųsti pranešimą
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Naujausios rezervacijos
                    </Text>

                    <View style={styles.bookingCard}>
                        <View>
                            <Text style={styles.bookingTitle}>
                                BMW M240 Detailing
                            </Text>

                            <Text style={styles.bookingInfo}>
                                2026-05-12 • 14:00
                            </Text>
                        </View>

                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>
                                ACTIVE
                            </Text>
                        </View>
                    </View>

                    <View style={styles.bookingCard}>
                        <View>
                            <Text style={styles.bookingTitle}>
                                Audi A6 Poliravimas
                            </Text>

                            <Text style={styles.bookingInfo}>
                                2026-05-13 • 10:00
                            </Text>
                        </View>

                        <View
                            style={[
                                styles.statusBadge,
                                styles.pendingBadge,
                            ]}
                        >
                            <Text style={styles.statusText}>
                                PENDING
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    content: {
        padding: 20,
        paddingBottom: 40,
    },

    title: {
        color: Colors.text,
        fontSize: 34,
        fontWeight: "700",
        marginBottom: 6,
    },

    subtitle: {
        color: Colors.secondary,
        fontSize: 16,
        marginBottom: 30,
    },

    statsContainer: {
        flexDirection: "row",
        gap: 14,
        marginBottom: 30,
    },

    statCard: {
        flex: 1,
        backgroundColor: Colors.card,
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: "#262626",
    },

    statNumber: {
        color: Colors.accent,
        fontSize: 32,
        fontWeight: "700",
        marginBottom: 8,
    },

    statLabel: {
        color: Colors.secondary,
        fontSize: 14,
    },

    section: {
        marginBottom: 30,
    },

    sectionTitle: {
        color: Colors.text,
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 16,
    },

    actionButton: {
        backgroundColor: Colors.card,
        borderRadius: 18,
        paddingVertical: 18,
        paddingHorizontal: 18,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#262626",
    },

    actionButtonText: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: "600",
    },

    bookingCard: {
        backgroundColor: Colors.card,
        borderRadius: 18,
        padding: 18,
        marginBottom: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#262626",
    },

    bookingTitle: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 6,
    },

    bookingInfo: {
        color: Colors.secondary,
        fontSize: 14,
    },

    statusBadge: {
        backgroundColor: "rgba(0,255,120,0.15)",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 999,
    },

    pendingBadge: {
        backgroundColor: "rgba(255,180,0,0.15)",
    },

    statusText: {
        color: Colors.text,
        fontSize: 12,
        fontWeight: "700",
    },
});