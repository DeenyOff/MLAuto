import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";

import { router } from "expo-router";

import { Colors } from "@/constants/theme";

type Props = {
    id: string;
    title: string;
    price: number;
    carType: string;
    image: string;
};

export default function ServiceCard({
                                        id,
                                        title,
                                        price,
                                        carType,
                                        image,
                                    }: Props) {
    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={() =>
                router.push({
                    pathname: "/service/[id]",
                    params: {
                        id,
                        title,
                        price,
                        carType,
                    },
                })
            }
        >
            <Image
                source={{ uri: image }}
                style={styles.image}
            />

            <View style={styles.content}>
                <Text style={styles.title}>
                    {title}
                </Text>

                <Text style={styles.carType}>
                    {carType}
                </Text>

                <View style={styles.bottomRow}>
                    <Text style={styles.price}>
                        €{price}
                    </Text>

                    <View style={styles.button}>
                        <Text style={styles.buttonText}>
                            Rezervuoti
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.card,
        borderRadius: 6,
        overflow: "hidden",
        marginBottom: 20,
    },

    image: {
        width: "100%",
        height: 190,
    },

    content: {
        padding: 18,
    },

    title: {
        color: Colors.text,
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 8,
    },

    carType: {
        color: Colors.secondary,
        marginBottom: 18,
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
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 6,
    },

    buttonText: {
        color: "white",
        fontWeight: "600",
    },
});