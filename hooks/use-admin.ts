import {getBookingList, getBookingsCount, getUsers, updateBookingStatus, deleteBooking, updateBookingDate} from "@/services/admin";
import { useState } from "react";
import { BookingItem, UsersType } from "@/services/admin";

export function useAdmin() {

    // fetchBookingCount
    const [bookingsCount, setBookingsCount] = useState(0);
    // fetchBookings
    const [bookings, setBookings] = useState<BookingItem[]>();
    //Инфа про юзеров
    const [users, setUser] = useState<UsersType[]>([]);

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

    // Получить пользователей
    async function fetchUsers() {
        const data = await getUsers();
        setUser(data);
    }

    // Изменить статус резервации по id
    async function changeBookingStatus(
        bookingId: string,
        status: string
    ) {
        await updateBookingStatus(bookingId, status);

        await fetchBookings();
    }

    // Удалить резервацию по id
    async function removeBooking(
        bookingId: string
    ) {
        await deleteBooking(bookingId);

        await fetchBookings();
    }

    // Изменение даты резервации
    async function changeBookingDate(
        bookingId: string,
        bookingDate: string
    ) {
        await updateBookingDate(
            bookingId,
            bookingDate
        );

        await fetchBookings();
    }



    return {
        bookingsCount,
        fetchBookingsCount,
        bookings,
        fetchBookings,
        users,
        fetchUsers,
        changeBookingStatus,
        removeBooking,
        changeBookingDate
    };
}