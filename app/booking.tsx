import { router, Stack, useLocalSearchParams } from "expo-router";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";

import { PrimaryButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PressableScale } from "@/components/ui/PressableScale";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Borders, Radius, Spacing, Typography } from "@/components/ui/tokens";
import { Colors } from "@/constants/theme";
import { useBooking } from "@/hooks/use-booking";

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

export default function BookingScreen() {
  const { service_id, title, price } = useLocalSearchParams<{
    service_id?: string | string[];
    title?: string;
    price?: string;
  }>();

  const {
    loading,
    createReservation,
    selectedDay,
    setSelectedDay,
    selectedTime,
    setSelectedTime,
    busySlots,
    fetchBusySlots,
  } = useBooking();

  const safeServiceId = Array.isArray(service_id) ? service_id[0] : service_id;
  const numericPrice = price ? Number(price) : null;

  async function handleConfirmBooking() {
    const finalDate = `${selectedDay} ${selectedTime}`;

    if (!safeServiceId) {
      Alert.alert("Klaida", "Nepavyko rasti paslaugos.");
      return;
    }

    // ÐŸÑ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð½Ð° Ð²Ñ‹Ð±Ð¾Ñ€ Ð´Ð°Ñ‚Ñ‹ Ð¸ Ð²Ñ€ÐµÐ¼ÐµÐ½Ð¸
    if (!selectedDay || !selectedTime) {
      Alert.alert("Klaida", "Pasirinkite data ir laika.");
    }

    try {
      await createReservation({
        serviceId: safeServiceId,
        selectedDate: finalDate,
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
        error instanceof Error ? error.message : "Nepavyko sukurti rezervacijos."
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
      <ScreenContainer scroll>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.keyboard}
        >
          <Card style={styles.serviceCard}>
            <Text style={styles.label}>Paslauga</Text>
            <Text style={styles.serviceTitle}>{title ?? "Paslauga"}</Text>

            <Text style={styles.label}>Kaina</Text>
            <Text style={styles.servicePrice}>
              EUR {numericPrice ? numericPrice.toFixed(2) : "-"}
            </Text>
          </Card>

          <SectionTitle>Pasirinkite laika</SectionTitle>

          <Calendar
            onDayPress={(day) => {
              setSelectedDay(day.dateString);
              fetchBusySlots(day.dateString);
            }}
            markedDates={{
              [selectedDay]: {
                selected: true,
                selectedColor: Colors.accent,
              },
            }}
            minDate={new Date().toISOString().split("T")[0]}
            theme={{
              backgroundColor: Colors.card,
              calendarBackground: Colors.card,
              textSectionTitleColor: Colors.secondary,
              dayTextColor: Colors.text,
              todayTextColor: Colors.accent,
              monthTextColor: Colors.text,
              arrowColor: Colors.accent,
              selectedDayBackgroundColor: Colors.accent,
              selectedDayTextColor: "#fff",
              textDisabledColor: "#444",
              textDayFontWeight: "500",
              textMonthFontWeight: "700",
              textDayFontSize: 16,
              textMonthFontSize: 18,
            }}
            style={styles.calendar}
          />

          <View style={styles.slotsContainer}>
            {AVAILABLE_TIME_SLOTS.map((slot) => {
              const isBusy = busySlots.includes(slot);
              const now = new Date();
              const slotDate = new Date(`${selectedDay}T${slot}:00`);
              const isPast = slotDate < now;
              const disabled = isBusy || isPast;
              const selected = selectedTime === slot;

              return (
                <PressableScale
                  key={slot}
                  disabled={disabled}
                  onPress={() => setSelectedTime(slot)}
                  style={[
                    styles.slotButton,
                    selected && styles.selectedSlot,
                    disabled && styles.disabledSlot,
                  ]}
                >
                  <Text
                    style={[
                      styles.slotText,
                      selected && styles.selectedSlotText,
                      disabled && styles.disabledSlotText,
                    ]}
                  >
                    {slot}
                  </Text>
                </PressableScale>
              );
            })}
          </View>

          <PrimaryButton
            title="Patvirtinti rezervacija"
            loading={loading}
            disabled={loading}
            onPress={handleConfirmBooking}
          />
        </KeyboardAvoidingView>
      </ScreenContainer>
    </>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  serviceCard: {
    marginBottom: Spacing.xxxl,
  },
  label: {
    color: Colors.secondary,
    fontSize: 13,
    marginBottom: Spacing.sm,
  },
  serviceTitle: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: Spacing.lg,
  },
  servicePrice: {
    color: Colors.accent,
    fontSize: 28,
    fontWeight: "700",
  },
  calendar: {
    borderRadius: Radius.xl,
    overflow: "hidden",
    marginBottom: Spacing.xxxl,
  },
  slotsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
    marginBottom: Spacing.xxxl,
  },
  slotButton: {
    width: "30%",
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    paddingVertical: Spacing.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Borders.soft,
  },
  slotText: {
    color: Colors.text,
    fontSize: Typography.body,
    fontWeight: "600",
  },
  selectedSlot: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  selectedSlotText: {
    color: "#fff",
  },
  disabledSlot: {
    opacity: 0.35,
  },
  disabledSlotText: {
    color: "#666",
  },
});
