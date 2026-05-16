import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

import { Colors } from "@/constants/theme";
import { Radius, Spacing, Typography } from "@/components/ui/tokens";

type StatusBadgeProps = {
    status: string;
    style?: StyleProp<ViewStyle>;
};

export function StatusBadge({ status, style }: StatusBadgeProps) {
    const tone = getStatusTone(status);

    return (
        <View style={[styles.badge, { backgroundColor: tone.backgroundColor }, style]}>
            <Text style={[styles.text, { color: tone.color }]}>
                {status.toUpperCase()}
            </Text>
        </View>
    );
}

function getStatusTone(status: string) {
    const normalized = status.toLowerCase();

    if (normalized === "completed") {
        return { backgroundColor: "rgba(74,222,128,0.15)", color: "#4ADE80" };
    }

    if (normalized === "cancelled") {
        return { backgroundColor: "rgba(255,60,60,0.15)", color: "#FF5C5C" };
    }

    if (normalized === "pending") {
        return { backgroundColor: "rgba(255,180,0,0.15)", color: "#FBBF24" };
    }

    return { backgroundColor: "rgba(233,2,30,0.16)", color: Colors.accent };
}

const styles = StyleSheet.create({
    badge: {
        alignSelf: "flex-start",
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: Radius.pill,
    },
    text: {
        fontSize: Typography.caption,
        fontWeight: "700",
    },
});
