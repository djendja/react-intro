import { useState } from "react"
import { AppContext, LanguageKey } from "../hooks/useAppContext"
import type { UserProps } from "../api/Api.models";

export const AppProvider = ({children}: any) => {
    const [lang, setLang] = useState<LanguageKey>(LanguageKey.English);
    const [user, setUser] = useState<UserProps | null>(null);

    return <AppContext.Provider value={{lang, setLang, user, setUser}}>
        {children}
    </AppContext.Provider>
}