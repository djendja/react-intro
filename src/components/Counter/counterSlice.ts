import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../state/store";

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0
    },
    reducers: {
        increment: (state) => {state.value++},
        decrement: (state) => {state.value--},
        incrementByAmount: (state, action) => {state.value += action.payload},
        reset: (state) => {state.value = 0}
    }
})

export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;