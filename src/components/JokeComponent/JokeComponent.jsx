import { useEffect, useState } from "react"

export const JokeComponent = () => {
    const [joke, setJoke] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [getJoke, setGetJoke] = useState(false);

    const getJokes = async (url, signal) => {
        try {
            const response = await fetch(url, signal);
            const data = await response.json();
            return data;
        }
        catch(error) {
            console.log("Error fetching joke:", error);
            setError("Error fetching");
        }     
    }

    useEffect(() => {
        if(!getJoke) return; 

        const controller = new AbortController();

        const signal = {signal: controller.signal};

        async function loadJoke() {
            setLoading(true);
            setError(null);

            try {
                const data = await getJokes('https://official-joke-api.appspot.com/random_joke', signal);
                console.log(data);
                
                setJoke(data);
                setGetJoke(false);
                setLoading(false);
            }
            catch(error) {
                if(error.name === 'AbortError') {
                    console.log("Fetch aborted");
                    return;
                }
                console.log('error', error);
                setError('Error fetching');
            }
        }

        loadJoke();

        return () => controller.abort();
    },[getJoke])

    const handleClick = () => {
       setGetJoke(true);
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if(error) {
        return <div>{error}</div>
    }

    return <div>
        <p>{joke?.setup}</p>
        <p>{joke?.punchline}</p>
        <button onClick={handleClick}>Get new joke</button>
    </div>
}