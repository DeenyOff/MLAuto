import { StyleSheet } from "react-native";

import { Colors } from "@/constants/theme";

export const Spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 30,
    screen: 20,
};

export const Radius = {
    sm: 10,
    md: 14,
    lg: 18,
    xl: 22,
    pill: 999,
};

export const Typography = {
    screenTitle: 32,
    sectionTitle: 20,
    cardTitle: 16,
    body: 16,
    meta: 14,
    caption: 12,
};

export const Borders = {
    default: "#262626",
    soft: "#2A2A2A",
};

export const uiStyles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    card: {
        backgroundColor: Colors.card,
        borderRadius: Radius.lg,
        borderWidth: 1,
        borderColor: Borders.default,
        padding: Spacing.xl,
    },
    divider: {
        height: 1,
        backgroundColor: Borders.default,
    },
    screenTitle: {
        color: Colors.text,
        fontSize: Typography.screenTitle,
        fontWeight: "700",
    },
    subtitle: {
        color: Colors.secondary,
        fontSize: Typography.body,
    },
});
