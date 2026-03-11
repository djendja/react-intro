import { Button } from "@mui/material"
import { useAppSelector, useAppDispatch } from "../../state/store";
import { selectCount, increment, decrement, incrementByAmount, reset } from "./counterSlice";

export const Counter = () => {
    const count = useAppSelector(selectCount);
    const dispatch = useAppDispatch();

    return <div>
        <h1>Counter {count}</h1>
        <Button variant="contained" onClick={() => dispatch(increment())}>Increment</Button>
        <Button variant="contained" onClick={() => dispatch(decrement())}>Decrement</Button>
        <Button variant="contained" onClick={() => dispatch(incrementByAmount(5))}>Increment by amount</Button>
        <Button variant="contained" onClick={() => dispatch(reset())}>Reset</Button>
    </div>
}