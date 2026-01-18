import { useState } from "react"
import { AppContext } from "../hooks/useAppContext"

export const AppProvider = ({children}) => {
    const [lang, setLang] = useState('en');

    return <AppContext.Provider value={{lang, setLang}}>
        {children}
    </AppContext.Provider>
}