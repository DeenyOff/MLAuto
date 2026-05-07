import { User } from "@supabase/supabase-js";

import { supabase } from "@/services/supabase";

// Описание состояний статуса Бронирования в виде строки
export type BookingStatus = "active" | "cancelled" | "completed" | string;

// Описание БД с дополнительными полями service_id  ervice_title для работы в приложении
export type Booking = {
    id: string;
    id_vartotojas: string;
    booking_date: string;
    status: BookingStatus;
    created_at: string;
    updated_at: string | null;
    admin_note: string | null;
    client_note: string | null;
    total_price: number | null;
    service_id?: string;
    service_title?: string;
};

export type CreateBookingInput = {
    userId: string;
    serviceId: string;
    bookingDate: string;
    totalPrice?: number | null;
};

// Описание реальный БД таблицы - rezervacija
type BookingRow = {
    id: string;
    id_vartotojas: string;
    booking_date: string;
    status: BookingStatus;
    created_at: string;
    updated_at: string | null;
    admin_note: string | null;
    client_note: string | null;
    total_price: number | null;
};

// Это связка - какая услуга относится к какой записи
type ReservationServiceRow = {
    id_rezervacija: string;
    id_paslaugos: string;
};

// Это кусок БД paslaugos
type ServiceTitleRow = {
    id: string;
    title: string;
};


// Здесь мы получаем данные пользователя из Authentication Supabase Users/то есть это еще не таблица vartotojas
export async function getCurrentAuthUser() {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        throw error;
    }

    if (!data.user) {
        throw new Error("Vartotojas neprisijunges.");
    }

    return data.user;
}

export async function createBooking({
    userId,
    serviceId,
    bookingDate,
    totalPrice,
}: CreateBookingInput) {
    const { data: reservation, error: reservationError } = await supabase
        .from("rezervacija")
        .insert({
            id_vartotojas: userId,
            booking_date: bookingDate,
            status: "active",
            total_price: totalPrice ?? null,
        })
        .select("*")
        .single();

    if (reservationError) {
        throw reservationError;
    }

    const { error: linkError } = await supabase
        .from("rezervacijos_paslaugos")
        .insert({
            id_rezervacija: (reservation as unknown as BookingRow).id,
            id_paslaugos: serviceId,
        });

    if (linkError) {
        await supabase
            .from("rezervacija")
            .delete()
            .eq("id", (reservation as unknown as BookingRow).id);

        throw linkError;
    }

    return {
        ...(reservation as unknown as BookingRow),
        service_id: serviceId,
    };
}

export async function getUserBookings(userId: string): Promise<Booking[]> {
    const { data, error } = await supabase
        .from("rezervacija")
        .select("*")
        .eq("id_vartotojas", userId)
        .order("created_at", { ascending: false });

    if (error) {
        throw error;
    }

    const bookings = (data ?? []) as unknown as BookingRow[];
    const bookingIds = bookings.map((booking) => booking.id);

    if (bookingIds.length === 0) {
        return [];
    }

    const { data: links, error: linksError } = await supabase
        .from("rezervacijos_paslaugos")
        .select("id_rezervacija, id_paslaugos")
        .in("id_rezervacija", bookingIds);

    if (linksError) {
        throw linksError;
    }

    const reservationLinks = (links ?? []) as ReservationServiceRow[];
    const serviceIds = [
        ...new Set(reservationLinks.map((link) => link.id_paslaugos)),
    ];

    if (serviceIds.length === 0) {
        return bookings;
    }

    const { data: services, error: servicesError } = await supabase
        .from("paslaugos")
        .select("id, title")
        .in("id", serviceIds);

    if (servicesError) {
        throw servicesError;
    }

    const serviceTitles = new Map(
        ((services ?? []) as ServiceTitleRow[]).map((service) => [
            service.id,
            service.title,
        ])
    );

    const serviceByReservation = new Map(
        reservationLinks.map((link) => [
            link.id_rezervacija,
            {
                service_id: link.id_paslaugos,
                service_title: serviceTitles.get(link.id_paslaugos),
            },
        ])
    );

    return bookings.map((booking) => ({
        ...booking,
        ...serviceByReservation.get(booking.id),
    }));
}

function getMetadataString(value: unknown) {
    return typeof value === "string" ? value : undefined;
}
