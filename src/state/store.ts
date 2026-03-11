import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import counterReducer from "../components/Counter/counterSlice";
import shoppingCartReducer from "../components/ShoppingCart/ShoppingCartSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        shoppingCart: shoppingCartReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;