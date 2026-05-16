import { StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle } from "react-native";

import { Colors } from "@/constants/theme";
import { Borders, Radius, Spacing, Typography } from "@/components/ui/tokens";

type AppInputProps = TextInputProps & {
    inputStyle?: StyleProp<TextStyle>;
};

export function AppInput({ inputStyle, placeholderTextColor, ...props }: AppInputProps) {
    return (
        <TextInput
            {...props}
            placeholderTextColor={placeholderTextColor ?? "#777"}
            style={[styles.input, inputStyle]}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: Colors.card,
        borderRadius: Radius.md,
        borderWidth: 1,
        borderColor: Borders.soft,
        color: Colors.text,
        fontSize: Typography.body,
        padding: Spacing.lg,
    },
});
