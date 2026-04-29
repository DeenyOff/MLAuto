import { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";

import { supabase } from "../services/supabase";

type Service = {
    id: string;
    title: string;
    price: number;
    car_type: string;
};

const serviceImages = [
    "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=1200&auto=format&fit=crop",
    "https://mlauto.lt/wp-content/uploads/2026/02/DSC05833-scaled.webp",
    "https://images.unsplash.com/photo-1489824904134-891ab64532f1?q=80&w=1200&auto=format&fit=crop",
];

export default function HomeScreen() {
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        fetchServices();
    }, []);

    async function fetchServices() {
        const { data, error } = await supabase
            .from("paslaugos")
            .select("*");

        if (error) {
            console.log(error);
            return;
        }

        setServices(data || []);
    }
    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.smallText}>Sveiki atvykę</Text>
                    <Text style={styles.logo}>ML AUTO</Text>
                </View>

                <View style={styles.logoCircle}>
                    <Text style={styles.logoLetter}>M</Text>
                </View>
            </View>

            {/* TOP BANNER */}
            <View style={styles.banner}>
                <Text style={styles.bannerTitle}>
                    Premium automobilių priežiūra
                </Text>

                <Text style={styles.bannerText}>
                    Greitas rezervavimas ir profesionalios paslaugos vienoje vietoje.
                </Text>
            </View>

            {/* SERVICES */}
            <Text style={styles.sectionTitle}>Paslaugos</Text>

            <FlatList
                data={services}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity style={styles.card} activeOpacity={0.9}>
                        <Image
                            source={{
                                uri: serviceImages[index % serviceImages.length],
                            }}
                            style={styles.image}
                        />

                        <View style={styles.cardContent}>
                            <Text style={styles.serviceName}>{item.title}</Text>

                            <Text style={styles.carType}>
                                {item.car_type}
                            </Text>

                            <View style={styles.bottomRow}>
                                <Text style={styles.price}>
                                    €{item.price}
                                </Text>

                                <View style={styles.bookButton}>
                                    <Text style={styles.bookButtonText}>
                                        Rezervuoti
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
const COLORS = {
    background: "#0F0F0F",
    card: "#1B1B1B",
    accent: "#E9021E",
    text: "#FFFFFF",
    secondary: "#A0A0A0",
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: 70,
        paddingHorizontal: 20,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 25,
    },

    smallText: {
        color: COLORS.secondary,
        fontSize: 14,
    },

    logo: {
        color: COLORS.text,
        fontSize: 32,
        fontWeight: "700",
        marginTop: 5,
    },

    logoCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.accent,
        justifyContent: "center",
        alignItems: "center",
    },

    logoLetter: {
        color: "white",
        fontSize: 22,
        fontWeight: "700",
    },

    banner: {
        backgroundColor: COLORS.card,
        borderRadius: 6,
        padding: 24,
        marginBottom: 30,
    },

    bannerTitle: {
        color: COLORS.text,
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 10,
    },

    bannerText: {
        color: COLORS.secondary,
        lineHeight: 22,
        fontSize: 15,
    },

    sectionTitle: {
        color: COLORS.text,
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 20,
    },

    card: {
        backgroundColor: COLORS.card,
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 20,
    },

    image: {
        width: "100%",
        height: 190,
    },

    cardContent: {
        padding: 18,
    },

    serviceName: {
        color: COLORS.text,
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 8,
    },

    carType: {
        color: COLORS.secondary,
        marginBottom: 18,
        textTransform: "capitalize",
    },

    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    price: {
        color: COLORS.accent,
        fontSize: 24,
        fontWeight: "700",
    },

    bookButton: {
        backgroundColor: COLORS.accent,
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 6,
    },

    bookButtonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 15,
    },
});