import { useState } from "react"
import { AppContext } from "../hooks/useAppContext"

export const AppProvider = ({children}) => {
    const [lang, setLang] = useState('en');
    const [user, setUser] = useState(null);

    return <AppContext.Provider value={{lang, setLang, user, setUser}}>
        {children}
    </AppContext.Provider>
}