import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import { Session, User } from "@supabase/supabase-js";

import { supabase } from "@/services/supabase";

type AuthContextValue = {
    initializing: boolean;
    session: Session | null;
    user: User | null;
    role: string | null;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
    const [initializing, setInitializing] = useState(true);
    const [session, setSession] = useState<Session | null>(null);
    const [role, setRole] = useState<string | null>(null);

    async function loadUserRole(userId: string) {
        const { data, error } = await supabase
            .from("vartotojas")
            .select("role")
            .eq("id", userId)
            .single();

        if (error) {
            console.error(error);
            return;
        }

        setRole(data.role);
    }

    useEffect(() => {
        let mounted = true;

        async function initializeAuth() {
            const { data } = await supabase.auth.getSession();

            if (!mounted) {
                return;
            }

            setSession(data.session);

            if (data.session?.user) {
                await loadUserRole(data.session.user.id);
            }

            setInitializing(false);
        }

        initializeAuth();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            async (_event, nextSession) => {
                setSession(nextSession);

                if (nextSession?.user) {
                    await loadUserRole(nextSession.user.id);
                } else {
                    setRole(null);
                }

                setInitializing(false);
            }
        );

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    const value = useMemo<AuthContextValue>(
        () => ({
            initializing,
            session,
            user: session?.user ?? null,
            role,
            signOut: async () => {
                const { error } = await supabase.auth.signOut();

                if (error) {
                    throw error;
                }
            },
        }),
        [initializing, session, role]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
}