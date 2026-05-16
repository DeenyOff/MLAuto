import { StyleSheet, Text } from "react-native";

import { Colors } from "@/constants/theme";
import { Card } from "@/components/ui/Card";
import { Spacing, Typography } from "@/components/ui/tokens";

type StatsCardProps = {
    value: string | number;
    label: string;
};

export function StatsCard({ value, label }: StatsCardProps) {
    return (
        <Card style={styles.card}>
            <Text style={styles.number}>{value}</Text>
            <Text style={styles.label}>{label}</Text>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
    },
    number: {
        color: Colors.accent,
        fontSize: 32,
        fontWeight: "700",
        marginBottom: Spacing.sm,
    },
    label: {
        color: Colors.secondary,
        fontSize: Typography.meta,
    },
});
