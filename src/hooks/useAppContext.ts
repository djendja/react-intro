import { createContext, useContext } from "react";
import type { UserProps } from "../api/Api.models";

export enum LanguageKey {
    English = 'en',
    german = 'de',
    french = 'fr'
}

const defaultAppContext = {
    lang: LanguageKey.English,
    setLang: (lang: LanguageKey) => {},
    setUser: (user: UserProps) => {},
    user: {email: '', password: ''} as UserProps | null
}

export const AppContext = createContext(defaultAppContext);


export const useAppContext = () => {
    const context = useContext(AppContext);
    if(!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context; //!! obavezno vratiti context
}