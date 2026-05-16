import { router } from "expo-router";
import { StyleSheet, Text } from "react-native";

import { SecondaryButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { InfoRow } from "@/components/ui/InfoRow";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Spacing, uiStyles } from "@/components/ui/tokens";
import { useAuth } from "@/contexts/auth";

export default function SettingsScreen() {
    const { role } = useAuth();

    return (
        <ScreenContainer scroll safeArea={false} contentStyle={styles.content}>
            <Text style={styles.title}>Nustatymai</Text>

            <Card style={styles.card}>
                <SectionTitle>Programa</SectionTitle>

                <SettingsButton title="Privatumo nustatymai" />

                {role === "admin" && (
                    <SettingsButton
                        title="Admin panel"
                        onPress={() => router.push("/admin")}
                    />
                )}
            </Card>

            <Card style={styles.card}>
                <SectionTitle>Pagalba</SectionTitle>

                <SettingsButton title="Kontaktai" />
                <SettingsButton title="DUK" />
                <SettingsButton title="Pagalbos centras" />
            </Card>

            <Card style={styles.card}>
                <SectionTitle>Informacija</SectionTitle>

                <InfoRow title="Versija" value="1.0.0" />
                <InfoRow title="Platforma" value="Expo React Native" />
                <InfoRow title="Role" value={role} />
            </Card>
        </ScreenContainer>
    );
}

function SettingsButton({
    title,
    onPress,
}: {
    title: string;
    onPress?: () => void;
}) {
    return (
        <SecondaryButton
            title={title}
            onPress={onPress}
            style={styles.settingsButton}
            textStyle={styles.settingsButtonText}
        />
    );
}

const styles = StyleSheet.create({
    content: {
        paddingTop: 70,
    },
    title: {
        ...uiStyles.screenTitle,
        marginBottom: Spacing.xxxl,
    },
    card: {
        marginBottom: Spacing.xl,
    },
    settingsButton: {
        alignItems: "flex-start",
        marginBottom: Spacing.md,
        minHeight: 0,
    },
    settingsButtonText: {
        textAlign: "left",
    },
});
