import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/theme";
import { Spacing, Typography } from "@/components/ui/tokens";

type EmptyStateProps = {
    message: string;
};

export function EmptyState({ message }: EmptyStateProps) {
    return <Text style={styles.emptyText}>{message}</Text>;
}

type LoadingStateProps = {
    message?: string;
};

export function LoadingState({ message = "Loading..." }: LoadingStateProps) {
    return (
        <View style={styles.loading}>
            <ActivityIndicator color={Colors.accent} />
            <Text style={styles.loadingText}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    emptyText: {
        color: Colors.secondary,
        fontSize: Typography.meta,
    },
    loading: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: "center",
        justifyContent: "center",
        gap: Spacing.md,
        padding: Spacing.screen,
    },
    loadingText: {
        color: Colors.secondary,
        fontSize: Typography.meta,
    },
});
