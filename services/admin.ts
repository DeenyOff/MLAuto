import {supabase} from "@/services/supabase";
import {User} from "@supabase/supabase-js";

export type BookingItem = {
    id: string;
    id_vartotojas: string;
    status: string;
    booking_date: string;
    service_title?: string;
}

export type UsersType = {
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    phone_number: string | null;
}


// Здесь получаем кол-во всех резерваций
export async function getBookingsCount() {
    const { count, error } = await supabase
        .from("rezervacija")
        .select("*", {count: "exact", head: true})

    if (error) throw error;
    return count ?? 0;
}

// Получаем инфу из таблицы rezervacijos и записываем конкретные данные в конкретные типы (BookingItem)
export async function getBookingList(): Promise<BookingItem[]> {

    // Получаем все резервации
    const { data: bookings, error: bookingsError } = await supabase
        .from("rezervacija")
        .select("*");

    if (bookingsError) {
        throw bookingsError;
    }

    // Получаем id всех резерваций
    const bookingIds = bookings.map(
        (booking) => booking.id
    );

    // Получаем связи резервация → услуга
    const { data: links, error: linksError } = await supabase
        .from("rezervacijos_paslaugos")
        .select("*")
        .in("id_rezervacija", bookingIds);

    if (linksError) {
        throw linksError;
    }

    // Получаем id всех услуг
    const serviceIds = links.map(
        (link) => link.id_paslaugos
    );

    // Получаем сами услуги
    const { data: services, error: servicesError } = await supabase
        .from("paslaugos")
        .select("id, title")
        .in("id", serviceIds);

    if (servicesError) {
        throw servicesError;
    }

    // Создаем map услуг
    const serviceMap = new Map(
        services.map((service) => [
            service.id,
            service.title,
        ])
    );

    // Создаем map резервация -> услуга
    const bookingServiceMap = new Map(
        links.map((link) => [
            link.id_rezervacija,
            serviceMap.get(link.id_paslaugos),
        ])
    );

    // Склеиваем данные
    return bookings.map((booking) => ({
        ...booking,

        service_title:
            bookingServiceMap.get(booking.id) ?? "Paslauga",
    }));
}

// Получаем инфу из таблиц reaervation | vartotojas | rezervacijos_paslaugos | paslaugos и возвращаем точную инфу об заказе и клиентской инфе(все в одном)
export async function getBookingById(id: string) {

    // reservation
    const { data: booking, error: bookingError } = await supabase
        .from("rezervacija")
        .select("*")
        .eq("id", id)
        .single();

    if (bookingError) {
        throw bookingError;
    }

    // user
    const { data: user } = await supabase
        .from("vartotojas")
        .select("*")
        .eq("id", booking.id_vartotojas)
        .single();

    // link
    const { data: link } = await supabase
        .from("rezervacijos_paslaugos")
        .select("*")
        .eq("id_rezervacija", booking.id)
        .single();

    // service
    const { data: service } = await supabase
        .from("paslaugos")
        .select("*")
        .eq("id", link.id_paslaugos)
        .single();

    return {
        ...booking,

        user,
        service,
    };
}

// Получаем список пользователей
export async function getUsers(): Promise<UsersType[]> {
    const { data, error } = await supabase
    .from("vartotojas")
    .select("*")

    if (error) throw error;
    return data ?? [];
}



// ФУНКЦИИ ДЛЯ ИЗМЕНЕНИЯ ТАБЛИЦЫ



// Обновляем status у конкретной резервации по ее id
export async function updateBookingStatus(
    bookingId: string,
    status: string
) {
    const { error } = await supabase
        .from("rezervacija")
        .update({
            status,
        })
        .eq("id", bookingId);

    if (error) {
        throw error;
    }
}

// Удаляем резервацию по id
export async function deleteBooking(
    bookingId: string
) {
    const { error } = await supabase
        .from("rezervacija")
        .delete()
        .eq("id", bookingId);

    if (error) {
        throw error;
    }
}

// Обновление даты резервации по id
export async function updateBookingDate(
    bookingId: string,
    bookingDate: string
) {
    const { error } = await supabase
        .from("rezervacija")
        .update({
            booking_date: bookingDate,
        })
        .eq("id", bookingId);

    if (error) {
        throw error;
    }
}
