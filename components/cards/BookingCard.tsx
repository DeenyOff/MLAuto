import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/theme";
import { PressableScale } from "@/components/ui/PressableScale";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Spacing, uiStyles, Typography } from "@/components/ui/tokens";

type BookingCardProps = {
    title: string;
    bookingDate: string;
    status: string;
    onPress?: () => void;
};

export function BookingCard({
    title,
    bookingDate,
    status,
    onPress,
}: BookingCardProps) {
    return (
        <PressableScale style={[uiStyles.card, styles.card]} onPress={onPress}>
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.meta}>{bookingDate}</Text>
            </View>

            <StatusBadge status={status} />
        </PressableScale>
    );
}

const styles = StyleSheet.create({
    card: {
        marginBottom: Spacing.md,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: Spacing.md,
    },
    content: {
        flex: 1,
    },
    title: {
        color: Colors.text,
        fontSize: Typography.cardTitle,
        fontWeight: "700",
        marginBottom: Spacing.sm,
    },
    meta: {
        color: Colors.secondary,
        fontSize: Typography.meta,
    },
});
