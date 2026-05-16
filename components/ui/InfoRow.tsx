import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/theme";
import { Spacing, Typography } from "@/components/ui/tokens";

type InfoRowProps = {
    title: string;
    value?: string | number | null;
};

export function InfoRow({ title, value }: InfoRowProps) {
    return (
        <View style={styles.row}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value ?? "-"}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        marginBottom: Spacing.lg,
    },
    title: {
        color: Colors.secondary,
        marginBottom: Spacing.xs,
    },
    value: {
        color: Colors.text,
        fontSize: Typography.body,
    },
});
