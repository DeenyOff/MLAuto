import { Stack, useLocalSearchParams } from "expo-router";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";

const COLORS = {
    background: "#0F0F0F",
    card: "#1B1B1B",
    accent: "#E9021E",
    text: "#FFFFFF",
    secondary: "#A0A0A0",
};

export default function ServiceDetails() {
    const { id, title, price, carType, description } = useLocalSearchParams();

    return (
        <>
            <Stack.Screen options={{
                title: String(title),
                headerBackTitle: "Atgal",
                headerStyle: {
                    backgroundColor: COLORS.background,
                },
                headerTintColor: COLORS.text,
            }}/>
            <View style={styles.container}>
                <Image
                    source={{
                        uri: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
                    }}
                    style={styles.image}
                />

                <View style={styles.content}>
                    <Text style={styles.title}>
                        {title}
                    </Text>

                    <Text style={styles.carType}>
                        {carType}
                    </Text>

                    <Text style={styles.description}>
                        {description}
                    </Text>

                    <Text style={styles.price}>
                        €{price}
                    </Text>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>
                            Rezervuoti
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    image: {
        width: "100%",
        height: 300,
    },

    content: {
        padding: 24,
    },

    title: {
        color: COLORS.text,
        fontSize: 30,
        fontWeight: "700",
        marginBottom: 10,
    },

    carType: {
        color: COLORS.secondary,
        fontSize: 16,
        marginBottom: 20,
    },

    description: {
        color: COLORS.secondary,
        lineHeight: 24,
        fontSize: 16,
        marginBottom: 30,
    },

    price: {
        color: COLORS.accent,
        fontSize: 34,
        fontWeight: "700",
        marginBottom: 30,
    },

    button: {
        backgroundColor: COLORS.accent,
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