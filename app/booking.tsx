import { router, Stack, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/constants/theme";
import { useBooking } from "@/hooks/use-booking";

export default function BookingScreen() {
  const { service_id, title, price } = useLocalSearchParams<{
    service_id?: string | string[];
    title?: string;
    price?: string;
  }>();

  const { selectedDate, setSelectedDate, loading, createReservation } =
    useBooking();

  const safeServiceId = Array.isArray(service_id) ? service_id[0] : service_id;
  const numericPrice = price ? Number(price) : null;

  async function handleConfirmBooking() {
    if (!safeServiceId) {
      Alert.alert("Klaida", "Nepavyko rasti paslaugos.");
      return;
    }

    try {
      await createReservation({
        serviceId: safeServiceId,
        selectedDate,
        totalPrice: Number.isFinite(numericPrice) ? numericPrice : null,
      });

      Alert.alert("Rezervacija sukurta", "Rezervacija sekmingai sukurta.", [
        {
          text: "Gerai",
          onPress: () => router.replace("/profile"),
        },
      ]);
    } catch (error) {
      Alert.alert(
        "Klaida",
        error instanceof Error ? error.message : "Nepavyko sukurti rezervacijos.",
      );
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Rezervacija",
          headerShown: true,
          headerBackTitle: "Atgal",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.container}
        >
          <View style={styles.serviceCard}>
            <Text style={styles.label}>Paslauga</Text>
            <Text style={styles.serviceTitle}>{title ?? "Paslauga"}</Text>

            <Text style={styles.label}>Kaina</Text>
            <Text style={styles.servicePrice}>
              EUR {numericPrice ? numericPrice.toFixed(2) : "-"}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Pasirinkite laika</Text>
          <TextInput
            value={selectedDate}
            onChangeText={setSelectedDate}
            placeholder="2026-05-15 14:00"
            placeholderTextColor={Colors.secondary}
            style={styles.input}
            editable={!loading}
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleConfirmBooking}
            disabled={loading}
            activeOpacity={0.9}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Patvirtinti rezervacija</Text>
            )}
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  serviceCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  label: {
    color: Colors.secondary,
    fontSize: 13,
    marginBottom: 6,
  },
  serviceTitle: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 18,
  },
  servicePrice: {
    color: Colors.accent,
    fontSize: 28,
    fontWeight: "700",
  },
  sectionTitle: {
    color: Colors.text,
    fontSize: 18,
    marginBottom: 12,
  },
  input: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    color: Colors.text,
    fontSize: 16,
    padding: 18,
    marginBottom: 30,
  },
  button: {
    backgroundColor: Colors.accent,
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    minHeight: 56,
    justifyContent: "center",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
