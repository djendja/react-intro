import type { BookProps, JokeProps, PaginatedResponse, PostFilters, PostProps, UserProps } from "./Api.models";

const get = async <T>(url: string, signal?: AbortSignal): Promise<T> => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                // //ako se desi da koristis api kod kojeg je CORS unknown, on nema eksplicitno podesenu server konfiguraciju u kojoj je ovaj vid headera definisan
                //zakomentarisano zbog jokes api-ja koji nema podesen CORS, mozes da otkomentarises liniju pa da vidis da ce api za books da radi jer oni imaju definisan CORS
                "Content-Type": "application/json" 
            },
            signal
        });

        if(!response.ok) {
            throw new Error(`Server responded with status ${response.status}`)
        }

        const data = (await response.json()) as T;
        return data;
    }
    catch(error) {
        console.log('Error', error);
        throw error;
    }
}

const post = async <T>(url: string, payload?: any): Promise<T> => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(payload)
        });

        if(!response.ok) {
            throw new Error(`Server responded with status ${response.status}`)
        }

        const data: T = await response.json();
        return data;
    }
    catch(error) {
        console.log('Error', error);
        throw error;
    }
}

const deleteRequest = async <T>(url: string): Promise<T> => {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json" 
            },
        });

        if(!response.ok) {
            throw new Error(`Server responded with status ${response.status}`)
        }

        const data = (await response.json()) as T;
        return data;
    }
    catch(error) {
        console.log('Error', error);
        throw error;
    }
}

const put = async <T>(url: string, payload?: any): Promise<T> => {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(payload)
        });

        if(!response.ok) {
            throw new Error(`Server responded with status ${response.status}`)
        }

        const data: T = await response.json();
        return data;
    }
    catch(error) {
        console.log('Error', error);
        throw error;
    }
}


const url = import.meta.env.VITE_SERVER_URL;

export const getBooks = async (signal?: AbortSignal): Promise<BookProps[]> => {
    return await get('https://potterapi-fedeperin.vercel.app/en/books', signal);          
}

export const getJokes = async (): Promise<JokeProps> => {
    return await get(' https://official-joke-api.appspot.com/random_joke');
}

export const getPosts = async (filters: PostFilters): Promise<PaginatedResponse<PostProps>> => {
    // let baseUrl = `${url}/posts`;

    // if(query.trim()) {
    //     baseUrl += `?q=${encodeURIComponent(query.trim())}`
    // }

    // return await get(baseUrl);

    const params = new URLSearchParams();

    if(filters?.q?.trim()) {
        params.set("q", filters.q.trim())
    }

    if(filters?.views_gte !== undefined) {
        params.set("views_gte", String(filters?.views_gte))
    }

    if(filters?.views_lte !== undefined) {
        params.set("views_lte", String(filters?.views_lte))
    }

    if(filters?._sort) {
        params.set("_sort", filters?._sort)
    }

    if(filters?._order) {
        params.set("_order", filters?._order)
    }

    params.set("_page", String(filters?._page ?? 1))
    params.set("_limit", String(filters?._limit ?? 3))

    const query = params.toString();

    // return await get(`${url}/posts${query ? `?${query}` : ''}`)

    const response = await fetch(`${url}/posts?${query}`);

    const data = await response.json();

    const totalCount = Number(response.headers.get("X-Total-Count") ?? 0);
    const limit = filters?._limit ?? 3;

    return {
        data,
        pages: Math.ceil(totalCount / limit),
        items: totalCount
    }
}

export const getPost = async (id?: string): Promise<PostProps> => {
    return await get(`${url}/posts/${id}`);
}

export const postPosts = async (payload?: any): Promise<PostProps> => {
    return await post(`${url}/posts`, payload)
}

export const deletePost = async (id?: string): Promise<PostProps> => {
    return await deleteRequest(`${url}/posts/${id}`)
}

export const putPost = async (id?: string, payload?: any): Promise<PostProps> => {
    return await put(`${url}/posts/${id}`, payload)
}

export const loginUser = async (): Promise<UserProps[]> => {
    return await get(`${url}/users`);
}