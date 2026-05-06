import { useCallback, useEffect, useState } from "react";

import {
    Booking,
    createBooking,
    ensureVartotojas,
    getCurrentAuthUser,
    getUserBookings,
} from "@/services/booking";

type UseBookingOptions = {
    fetchOnMount?: boolean;
};

type CreateReservationInput = {
    serviceId: string;
    selectedDate: string;
    totalPrice?: number | null;
};

export function useBooking(options: UseBookingOptions = {}) {
    const [selectedDate, setSelectedDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [reservations, setReservations] = useState<Booking[]>([]);

    const fetchReservations = useCallback(async () => {
        setLoading(true);

        try {
            const user = await getCurrentAuthUser();
            const vartotojasId = await ensureVartotojas(user);
            const bookings = await getUserBookings(vartotojasId);
            setReservations(bookings);

            return bookings;
        } finally {
            setLoading(false);
        }
    }, []);

    const createReservation = useCallback(
        async ({ serviceId, selectedDate, totalPrice }: CreateReservationInput) => {
            const trimmedDate = selectedDate.trim();

            if (!trimmedDate) {
                throw new Error("Pasirinkite rezervacijos data.");
            }

            const parsedDate = new Date(trimmedDate.replace(" ", "T"));

            if (Number.isNaN(parsedDate.getTime())) {
                throw new Error("Iveskite tinkama data, pvz. 2026-05-15 14:00.");
            }

            setLoading(true);

            try {
                const user = await getCurrentAuthUser();
                const vartotojasId = await ensureVartotojas(user);

                return await createBooking({
                    userId: vartotojasId,
                    serviceId,
                    bookingDate: parsedDate.toISOString(),
                    totalPrice,
                });
            } finally {
                setLoading(false);
            }
        },
        []
    );

    useEffect(() => {
        if (!options.fetchOnMount) {
            return;
        }

        fetchReservations().catch(() => {
            setReservations([]);
        });
    }, [fetchReservations, options.fetchOnMount]);

    return {
        selectedDate,
        setSelectedDate,
        loading,
        reservations,
        fetchReservations,
        createReservation,
    };
}
