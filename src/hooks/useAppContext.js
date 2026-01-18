import { createContext, useContext } from "react";

const defaultAppContext = {
    lang: 'en',
    setLang: () => {}
}

export const AppContext = createContext(defaultAppContext);


export const useAppContext = () => {
    const context = useContext(AppContext);
    if(!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context; //!! obavezno vratiti context
}