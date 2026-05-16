import { Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/theme";
import { Card } from "@/components/ui/Card";
import { Spacing, Typography } from "@/components/ui/tokens";

export default function PromoBanner() {
    return (
        <Card style={styles.banner}>
            <Text style={styles.bannerTitle}>
                Premium automobilių priežiūra
            </Text>

            <Text style={styles.bannerText}>
                Greitas rezervavimas ir profesionalios paslaugos vienoje vietoje.
            </Text>
        </Card>
    );
}
const styles = StyleSheet.create({
    banner: {
        padding: Spacing.xxl,
        marginBottom: Spacing.xxxl,
    },

    bannerTitle: {
        color: Colors.text,
        fontSize: 24,
        fontWeight: "700",
        marginBottom: Spacing.sm,
    },

    bannerText: {
        color: Colors.secondary,
        lineHeight: 22,
        fontSize: Typography.meta,
    },
});
