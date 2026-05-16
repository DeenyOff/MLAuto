import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

import { Colors } from "@/constants/theme";
import { Spacing, Typography } from "@/components/ui/tokens";

type SectionTitleProps = {
    children: string;
    style?: StyleProp<TextStyle>;
};

export function SectionTitle({ children, style }: SectionTitleProps) {
    return <Text style={[styles.title, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
    title: {
        color: Colors.text,
        fontSize: Typography.sectionTitle,
        fontWeight: "700",
        marginBottom: Spacing.lg,
    },
});
