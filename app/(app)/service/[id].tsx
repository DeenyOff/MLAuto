import { router, Stack, useLocalSearchParams } from "expo-router";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";


import { Colors } from "@/constants/theme";

export default function ServiceDetails() {
    const { id, title, price, carType, description, service_img_url} = useLocalSearchParams();

    function handleBookingPress() {
        router.push({
            pathname: "/booking",
            params: {
                service_id: String(id),
                title: String(title ?? ""),
                price: String(price ?? ""),
            },
        });
    }

    return (
        <>
            <Stack.Screen
                options={{
                    title: String(title ?? "Paslauga"),
                    headerShown: true,
                    headerBackTitle: "Atgal",
                    headerStyle: {
                        backgroundColor: Colors.background,
                    },
                    headerTintColor: Colors.text,
                }}
            />

            <View style={styles.container}>
                <Image
                    source={{ uri: String(service_img_url) }}
                    style={styles.image}
                />

                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.carType}>{carType}</Text>
                    <Text style={styles.description}>{description}</Text>
                    <Text style={styles.price}>EUR {price}</Text>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleBookingPress}
                        activeOpacity={0.9}
                    >
                        <Text style={styles.buttonText}>Rezervuoti</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    image: {
        width: "100%",
        height: 300,
    },
    content: {
        padding: 24,
    },
    title: {
        color: Colors.text,
        fontSize: 30,
        fontWeight: "700",
        marginBottom: 10,
    },
    carType: {
        color: Colors.secondary,
        fontSize: 16,
        marginBottom: 20,
    },
    description: {
        color: Colors.secondary,
        lineHeight: 24,
        fontSize: 16,
        marginBottom: 30,
    },
    price: {
        color: Colors.accent,
        fontSize: 34,
        fontWeight: "700",
        marginBottom: 30,
    },
    button: {
        backgroundColor: Colors.accent,
        paddingVertical: 18,
        borderRadius: 6,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "700",
    },
});
