import { getPostAxios, getPostsAxios } from "../api/ApiAxios";

export const postsQuery = (query?: string) => ({
    queryKey: ["posts", query ?? ""],
    queryFn: () => getPostsAxios(query),
})

export const postDetailQuery = (id?: string) => ({
    queryKey: ["post", id],
    queryFn: () => getPostAxios(id)
})