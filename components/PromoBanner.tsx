import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/theme";

export default function PromoBanner() {
    return (
        <View style={styles.banner}>
            <Text style={styles.bannerTitle}>
                Premium automobilių priežiūra
            </Text>

            <Text style={styles.bannerText}>
                Greitas rezervavimas ir profesionalios paslaugos vienoje vietoje.
            </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    banner: {
        backgroundColor: Colors.card,
        borderRadius: 24,
        padding: 24,
        marginBottom: 30,
    },

    bannerTitle: {
        color: Colors.text,
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 10,
    },

    bannerText: {
        color: Colors.secondary,
        lineHeight: 22,
        fontSize: 15,
    },
});