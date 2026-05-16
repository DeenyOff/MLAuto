import { StyleSheet, Text } from "react-native";

import { Colors } from "@/constants/theme";
import { PressableScale } from "@/components/ui/PressableScale";
import { Spacing, uiStyles, Typography } from "@/components/ui/tokens";

type AdminActionCardProps = {
    title: string;
    onPress?: () => void;
};

export function AdminActionCard({ title, onPress }: AdminActionCardProps) {
    return (
        <PressableScale style={[uiStyles.card, styles.card]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </PressableScale>
    );
}

const styles = StyleSheet.create({
    card: {
        paddingVertical: Spacing.lg,
        paddingHorizontal: Spacing.lg,
        marginBottom: Spacing.md,
    },
    text: {
        color: Colors.text,
        fontSize: Typography.body,
        fontWeight: "600",
    },
});
