import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/theme";
import { PressableScale } from "@/components/ui/PressableScale";
import { Spacing, uiStyles, Typography } from "@/components/ui/tokens";

type UserCardProps = {
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    phoneNumber?: string | null;
    onPress?: () => void;
};

export function UserCard({
    firstName,
    lastName,
    email,
    phoneNumber,
    onPress,
}: UserCardProps) {
    return (
        <PressableScale style={[uiStyles.card, styles.card]} onPress={onPress}>
            <View style={styles.userLeft}>
                <Text style={styles.userName} numberOfLines={1}>
                    {firstName ?? ""} {lastName ?? ""}
                </Text>

                <Text style={styles.userInfo} numberOfLines={1}>
                    {email}
                </Text>

                <Text style={styles.userInfo}>{phoneNumber}</Text>
            </View>
        </PressableScale>
    );
}

const styles = StyleSheet.create({
    card: {
        paddingVertical: Spacing.lg,
        paddingHorizontal: Spacing.lg,
        marginBottom: Spacing.md,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    userLeft: {
        flex: 1,
        paddingRight: Spacing.md,
    },
    userName: {
        color: Colors.text,
        fontSize: Typography.cardTitle,
        fontWeight: "700",
        marginBottom: Spacing.xs,
    },
    userInfo: {
        color: Colors.secondary,
        fontSize: 13,
        marginBottom: 2,
    },
});
