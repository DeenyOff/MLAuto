import { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
} from "react-native";

import { supabase } from "@/services/supabase";
import { Colors } from "@/constants/theme";

import HomeHeader from "@/components/HomeHeader";
import PromoBanner from "@/components/PromoBanner";
import ServiceCard from "@/components/ServiceCard";

type Service = {
    id: string;
    title: string;
    price: number;
    car_type: string;
    description: string;
    service_img_url: string;
};


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
            <HomeHeader />

            <PromoBanner />

            <Text style={styles.sectionTitle}>
                Paslaugos
            </Text>

            <FlatList
                data={services}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 40,
                }}
                renderItem={({ item, index }) => (
                    <ServiceCard
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        description={item.description}
                        carType={item.car_type}
                        image={item.service_img_url}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingTop: 70,
        paddingHorizontal: 20,
    },

    sectionTitle: {
        color: Colors.text,
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 20,
    },
});
