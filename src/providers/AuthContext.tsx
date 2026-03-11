import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "../api/Api.models";
import { isTokenExpired } from "../utils/jwt";
import { fetchProfile, loginAPI } from "../api/Api";

interface AuthContextValue {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({children}: {children: ReactNode}) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("auth_token");

        if(!savedToken || isTokenExpired(savedToken)) {
            localStorage.removeItem("auth_token");
            setIsLoading(false);
            return;
        }

        fetchProfile(savedToken)
        .then((profile) => {
            setToken(savedToken);
            setUser(profile)
        })
        .catch(() => {
            localStorage.removeItem("auth_token")
        })
        .finally(() => setIsLoading(false));

    }, [])


    const login = useCallback(async (email: string, password: string) => {
        setError(null);
        setIsLoading(true);

        try {
            const { accessToken: newToken, user } = await loginAPI(email, password);
            const profile = await fetchProfile(newToken);

            localStorage.setItem("auth_token", newToken)
            setToken(newToken);
            setUser(profile);
        }
        catch(err) {
            setError((err as Error).message)
        }
        finally {
            setIsLoading(false);
        }
    },[])

    const logout = useCallback(() => {
        localStorage.removeItem("auth_token");
        setToken(null);
        setUser(null)
    },[])


    return (
        <AuthContext.Provider value={{user, token, isLoading, error, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if(!ctx) throw new Error("useAuth must be within <AuthProvider>");
    return ctx;
}