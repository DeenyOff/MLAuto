import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/theme";
import { useUserInfo } from "@/hooks/use-user";

export default function HomeHeader() {

    const { avatarLetter } = useUserInfo();

    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.smallText}>Sveiki atvykę</Text>
                <Text style={styles.logo}>ML AUTO</Text>
            </View>

            <View style={styles.logoCircle}>
                <Text style={styles.logoLetter}>{avatarLetter}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 25,
    },

    smallText: {
        color: Colors.secondary,
        fontSize: 14,
    },

    logo: {
        color: Colors.text,
        fontSize: 32,
        fontWeight: "700",
        marginTop: 5,
    },
    logoCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.accent,
        justifyContent: "center",
        alignItems: "center",
    },

    logoLetter: {
        color: "white",
        fontSize: 22,
        fontWeight: "700",
    },
});