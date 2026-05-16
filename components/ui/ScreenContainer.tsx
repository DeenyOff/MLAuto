import { PropsWithChildren } from "react";
import {
    ScrollView,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Spacing, uiStyles } from "@/components/ui/tokens";

type ScreenContainerProps = PropsWithChildren<{
    scroll?: boolean;
    safeArea?: boolean;
    centered?: boolean;
    contentStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    showsVerticalScrollIndicator?: boolean;
}>;

export function ScreenContainer({
    children,
    scroll,
    safeArea = true,
    centered,
    contentStyle,
    style,
    showsVerticalScrollIndicator = false,
}: ScreenContainerProps) {
    const Wrapper = safeArea ? SafeAreaView : View;

    if (scroll) {
        return (
            <Wrapper style={[uiStyles.screen, style]}>
                <ScrollView
                    contentContainerStyle={[
                        styles.content,
                        centered && styles.centered,
                        contentStyle,
                    ]}
                    showsVerticalScrollIndicator={showsVerticalScrollIndicator}
                >
                    {children}
                </ScrollView>
            </Wrapper>
        );
    }

    return (
        <Wrapper
            style={[
                uiStyles.screen,
                styles.content,
                centered && styles.centered,
                style,
                contentStyle,
            ]}
        >
            {children}
        </Wrapper>
    );
}

const styles = StyleSheet.create({
    content: {
        padding: Spacing.screen,
        paddingBottom: 40,
    },
    centered: {
        flexGrow: 1,
        justifyContent: "center",
    },
});
