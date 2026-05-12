import { useAuth } from "@/contexts/auth";

export function useUserInfo() {
    const { user } = useAuth();

    const metadata = user?.user_metadata ?? {};


    const displayName =
        metadata.full_name ||
        metadata.name ||
        metadata.username ||
        user?.email ||
        "Vartotojas";

    const avatarLetter = displayName
        .charAt(0)
        .toUpperCase();

    return {
        user,
        displayName,
        avatarLetter,
    };
}