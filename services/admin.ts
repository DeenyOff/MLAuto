import {supabase} from "@/services/supabase";
import {User} from "@supabase/supabase-js";

export type BookingItem = {
    id: string;
    id_vartotojas: string;
    status: string;
    booking_date: string;
}

export type Users = {
    id: string;
    firtst_name: string;
    last_name: string;
    email: string;
    phone_number: string;
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
    const { data, error } = await supabase
        .from("rezervacija")
        .select("*")
        .order("created_at", { ascending: false }); // это штука сортирует чтобы новые записи были сверху

    if (error) throw error;
    return (data ?? []) as BookingItem[];
}

export async function getUsers(): Promise<Users[]> {
    const { data, error } = await supabase
    .from("vartotojas")
    .select("*")

    if (error) throw error;
    return data ?? [];
}

