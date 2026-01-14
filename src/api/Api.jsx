const get = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                // //ako se desi da koristis api kod kojeg je CORS unknown, on nema eksplicitno podesenu server konfiguraciju u kojoj je ovaj vid headera definisan
                //zakomentarisano zbog jokes api-ja koji nema podesen CORS, mozes da otkomentarises liniju pa da vidis da ce api za books da radi jer oni imaju definisan CORS
                // "Content-Type": "application/json" 
            },
        });

        if(!response.ok) {
            throw new Error(`Server responded with status ${response.status}`)
        }

        const data = await response.json();
        return data;
    }
    catch(error) {
        console.log('Error', error);
        throw error;
    }
}

export const getBooks = async (signal) => {
    return await get('https://potterapi-fedeperin.vercel.app/en/books', signal);          
}

export const getJokes = async () => {
    return await get(' https://official-joke-api.appspot.com/random_joke');
}

