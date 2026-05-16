import { PropsWithChildren } from "react";
import {
    ActivityIndicator,
    GestureResponderEvent,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    ViewStyle,
} from "react-native";

import { Colors } from "@/constants/theme";
import { PressableScale } from "@/components/ui/PressableScale";
import { Borders, Radius, Spacing, Typography } from "@/components/ui/tokens";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

export type AppButtonProps = PropsWithChildren<{
    title?: string;
    onPress?: (event: GestureResponderEvent) => void;
    disabled?: boolean;
    loading?: boolean;
    variant?: ButtonVariant;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}>;

export function AppButton({
    title,
    children,
    onPress,
    disabled,
    loading,
    variant = "primary",
    style,
    textStyle,
}: AppButtonProps) {
    return (
        <PressableScale
            disabled={disabled || loading}
            onPress={onPress}
            style={[
                styles.base,
                styles[variant],
                (disabled || loading) && styles.disabled,
                style,
            ]}
        >
            {loading ? (
                <ActivityIndicator color="white" />
            ) : (
                <Text style={[styles.text, styles[`${variant}Text`], textStyle]}>
                    {title ?? children}
                </Text>
            )}
        </PressableScale>
    );
}

export function PrimaryButton(props: Omit<AppButtonProps, "variant">) {
    return <AppButton {...props} variant="primary" />;
}

export function SecondaryButton(props: Omit<AppButtonProps, "variant">) {
    return <AppButton {...props} variant="secondary" />;
}

export function DangerButton(props: Omit<AppButtonProps, "variant">) {
    return <AppButton {...props} variant="danger" />;
}

export function GhostButton(props: Omit<AppButtonProps, "variant">) {
    return <AppButton {...props} variant="ghost" />;
}

const styles = StyleSheet.create({
    base: {
        minHeight: 56,
        borderRadius: Radius.lg,
        paddingVertical: Spacing.lg,
        paddingHorizontal: Spacing.lg,
        alignItems: "center",
        justifyContent: "center",
    },
    primary: {
        backgroundColor: Colors.accent,
    },
    secondary: {
        backgroundColor: Colors.card,
        borderWidth: 1,
        borderColor: Borders.soft,
    },
    danger: {
        backgroundColor: "rgba(255,60,60,0.15)",
        borderWidth: 1,
        borderColor: "rgba(255,60,60,0.2)",
    },
    ghost: {
        backgroundColor: "transparent",
        minHeight: 0,
        paddingVertical: Spacing.sm,
    },
    disabled: {
        opacity: 0.65,
    },
    text: {
        fontSize: Typography.body,
        fontWeight: "700",
    },
    primaryText: {
        color: "white",
    },
    secondaryText: {
        color: Colors.text,
        fontWeight: "600",
    },
    dangerText: {
        color: "#FF5C5C",
    },
    ghostText: {
        color: Colors.accent,
        fontWeight: "600",
    },
});
