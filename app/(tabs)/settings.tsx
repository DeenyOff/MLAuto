import { View, Text } from "react-native";

export default function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" }}>
            <Text style={{ color: "#fff" }}>Settings Screen</Text>
            <Text style={{ color: "#fff" }}>App version: 1.2.2</Text>
            <Text style={{ color: "#fff" }}>Git commits - 4</Text>
        </View>
    );
}