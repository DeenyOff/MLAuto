import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/theme";
import { Booking } from "@/services/booking";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Borders, Spacing, Typography } from "@/components/ui/tokens";

type ReservationCardProps = {
    reservation: Booking;
    formatDate: (value?: string) => string;
};

export function ReservationCard({ reservation, formatDate }: ReservationCardProps) {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>
                {reservation.service_title ?? reservation.service_id}
            </Text>
            <Text style={styles.meta}>{formatDate(reservation.booking_date)}</Text>
            <StatusBadge status={reservation.status} />
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        borderTopColor: Borders.soft,
        borderTopWidth: 1,
        paddingTop: Spacing.md,
        marginTop: Spacing.md,
    },
    title: {
        color: Colors.text,
        fontSize: Typography.cardTitle,
        fontWeight: "700",
        marginBottom: Spacing.sm,
    },
    meta: {
        color: Colors.secondary,
        marginBottom: Spacing.sm,
    },
});
