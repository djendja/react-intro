import { useEffect, useState } from "react"


export const CountdownTimer = () => {
    const [seconds, setSeconds] = useState(60);
    const [isActive, setIsActive] = useState(false);

    
    useEffect(() => {
        if(!isActive || seconds === 0) return;
        const interval = setInterval(() => {
            setSeconds((second) => second - 1)
        }, 1000)

        return () => clearInterval(interval);
    }, [isActive, seconds])

    const handleReset = () => {
        setSeconds(60);
        setIsActive(false);
    }

    return <div>
        <p>Countdown Timer {seconds === 0 ? 'Time\'s up' : seconds}</p>
        <button onClick={() => setIsActive(!isActive)}>{isActive ? 'Stop' : 'Start'}</button>
        <button onClick={handleReset}>Reset</button>
    </div>
}