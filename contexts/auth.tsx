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
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
    const [initializing, setInitializing] = useState(true);
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        let mounted = true;

        supabase.auth.getSession().then(({ data }) => {
            if (!mounted) {
                return;
            }

            setSession(data.session);
            setInitializing(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, nextSession) => {
            setSession(nextSession);
            setInitializing(false);
        });

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
            signOut: async () => {
                const { error } = await supabase.auth.signOut();

                if (error) {
                    throw error;
                }
            },
        }),
        [initializing, session]
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
