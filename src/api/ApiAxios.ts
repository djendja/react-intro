import axios, { type AxiosRequestConfig } from "axios";
import type { BookProps, JokeProps, PostProps } from "./Api.models";

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

const get = async <T>(url: string, signal?: AbortSignal): Promise<T> => {
  const config: AxiosRequestConfig = {};

  if (signal) {
    config.signal = signal;
  }

  try {
    const { data } = await axiosInstance.get<T>(url, config);
    return data;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};


const post = async <T>(url: string, payload?: any): Promise<T> => {
    try {
        const { data } = await axiosInstance.post<T>(url, payload);
        return data;
    }
    catch(error) {
        console.log('Error', error);
        throw error;
    }
}

const deleteRequest = async <T>(url: string): Promise<T> => {
    try {
        const { data } = await axiosInstance.delete<T>(url);
        return data;
    }
    catch(error) {
        console.log('Error', error);
        throw error;
    }
}

const put = async <T>(url: string, payload?: any): Promise<T> => {
    try {
        const { data} = await axiosInstance.put<T>(url, payload);
        return data;
    }
    catch(error) {
        console.log('Error', error);
        throw error;
    }
}

const url = import.meta.env.VITE_SERVER_URL;


export const getBooksAxios = async (signal?: AbortSignal): Promise<BookProps[]> => {
    return await get('https://potterapi-fedeperin.vercel.app/en/books', signal);          
}

export const getJokesAxios = async (): Promise<JokeProps> => {
    return await get(' https://official-joke-api.appspot.com/random_joke');
}

export const getPostsAxios = async (query=''): Promise<PostProps[]> => {
    let baseUrl = `${url}/posts`;

    if(query.trim()) {
        baseUrl += `?q=${encodeURIComponent(query.trim())}`
    }

    return await get(baseUrl);
}

export const getPostAxios = async (id?: string): Promise<PostProps> => {
    return await get(`${url}/posts/${id}`);
}

export const postPostsAxios = async (payload?: any): Promise<PostProps> => {
    return await post(`${url}/posts`, payload)
}
