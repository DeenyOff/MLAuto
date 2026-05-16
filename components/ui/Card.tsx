import { PropsWithChildren } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

import { uiStyles } from "@/components/ui/tokens";

type CardProps = PropsWithChildren<{
    style?: StyleProp<ViewStyle>;
}>;

export function Card({ children, style }: CardProps) {
    return <View style={[uiStyles.card, style]}>{children}</View>;
}
