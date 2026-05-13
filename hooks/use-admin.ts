import {getBookingList, getBookingsCount, getUsers} from "@/services/admin";
import { useState } from "react";
import {BookingItem, Users} from "@/services/admin";
import {User} from "@supabase/supabase-js";

export function useAdmin() {

    // fetchBookingCount
    const [bookingsCount, setBookingsCount] = useState(0);
    // fetchBookings
    const [bookings, setBookings] = useState<BookingItem[]>();
    //Инфа про юзеров
    const [user, setUser] = useState<Users[]>();

    // Функция запроса и записи в переменную bookingsCount кол-ва резерваций
    async function fetchBookingsCount() {
        const count = await getBookingsCount();
        setBookingsCount(count);
    }

    // Получить данные из таблицы rezervacijos и сразу
    async function fetchBookings() {
        const data = await getBookingList();

        const formattedBookings = data.map((booking) => ({
            ...booking,

            booking_date: new Date(
                booking.booking_date
            ).toLocaleString("lt-LT", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            }),
        }));

        setBookings(formattedBookings);
    }

    async function fetchUsers() {
        const data = await getUsers();
        setUser(data);
    }

    return {
        bookingsCount,
        fetchBookingsCount,
        bookings,
        fetchBookings,
        user,
        fetchUsers,
    };
}