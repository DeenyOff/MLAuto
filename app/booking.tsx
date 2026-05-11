import { router, Stack, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform, ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/constants/theme";
import { useBooking } from "@/hooks/use-booking";
import {Calendar} from "react-native-calendars";

export default function BookingScreen() {
  const { service_id, title, price } = useLocalSearchParams<{
    service_id?: string | string[];
    title?: string;
    price?: string;
  }>();

  const AVAILABLE_TIME_SLOTS = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
  ];

  const {
    selectedDate,
    setSelectedDate,
    loading,
    createReservation,
    selectedDay,
    setSelectedDay,
    selectedTime,
    setSelectedTime,
    busySlots,
    fetchBusySlots
  } = useBooking();

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
      <ScrollView>
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

            <Calendar
                onDayPress={(day) => {
                  setSelectedDay(day.dateString)
                  fetchBusySlots(day.dateString)
                }}
            />
            <View>
              {AVAILABLE_TIME_SLOTS.map((slot) => {
                const isBusy = busySlots.includes(slot);

                const now = new Date();

                const slotDate = new Date(
                    `${selectedDay}T${slot}:00`
                );

                const isPast = slotDate < now;

                const disabled = isBusy || isPast;

                return (
                    <TouchableOpacity
                        key={slot}
                        disabled={disabled}
                        onPress={() => setSelectedTime(slot)}
                    >
                      <Text>
                        {slot}
                        {isBusy ? " ❌" : ""}
                      </Text>
                    </TouchableOpacity>
                );
              })}
            </View>

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
      </ScrollView>


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
