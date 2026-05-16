import { PropsWithChildren } from "react";
import {
    Pressable,
    PressableProps,
    StyleProp,
    StyleSheet,
    ViewStyle,
} from "react-native";

type PressableScaleProps = PropsWithChildren<
    PressableProps & {
        style?: StyleProp<ViewStyle>;
        pressedStyle?: StyleProp<ViewStyle>;
    }
>;

export function PressableScale({
    children,
    style,
    pressedStyle,
    disabled,
    ...props
}: PressableScaleProps) {
    return (
        <Pressable
            {...props}
            disabled={disabled}
            style={({ pressed }) => [
                style,
                pressed && !disabled && styles.pressed,
                pressed && !disabled && pressedStyle,
            ]}
        >
            {children}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.85,
        transform: [{ scale: 0.97 }],
    },
});
