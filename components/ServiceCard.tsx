import { router } from "expo-router";
import {
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { Colors } from "@/constants/theme";
import { PressableScale } from "@/components/ui/PressableScale";
import { Radius, Spacing, Typography } from "@/components/ui/tokens";

type Props = {
    id: string;
    title: string;
    price: number;
    carType: string;
    description: string;
    image: string;
};

export default function ServiceCard({
    id,
    title,
    price,
    carType,
    description,
    image,
}: Props) {
    return (
        <PressableScale
            style={styles.card}
            onPress={() =>
                router.push({
                    pathname: "/service/[id]",
                    params: {
                        id,
                        title,
                        price,
                        carType,
                        description,
                        service_img_url: image,
                    },
                })
            }
        >
            <Image source={{ uri: image }} style={styles.image} />

            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.carType}>{carType}</Text>

                <View style={styles.bottomRow}>
                    <Text style={styles.price}>EUR {price}</Text>

                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Rezervuoti</Text>
                    </View>
                </View>
            </View>
        </PressableScale>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.card,
        borderRadius: Radius.lg,
        borderWidth: 1,
        borderColor: "#262626",
        overflow: "hidden",
        marginBottom: Spacing.xl,
    },
    image: {
        width: "100%",
        height: 190,
    },
    content: {
        padding: Spacing.lg,
    },
    title: {
        color: Colors.text,
        fontSize: 22,
        fontWeight: "700",
        marginBottom: Spacing.sm,
    },
    carType: {
        color: Colors.secondary,
        marginBottom: Spacing.lg,
    },
    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    price: {
        color: Colors.accent,
        fontSize: 24,
        fontWeight: "700",
    },
    button: {
        backgroundColor: Colors.accent,
        paddingHorizontal: Spacing.lg,
        paddingVertical: 10,
        borderRadius: Radius.sm,
    },
    buttonText: {
        color: "white",
        fontSize: Typography.meta,
        fontWeight: "600",
    },
});
