export interface JokeProps {
  type: string;
  setup: string;
  punchline: string;
  id: number;
}

export interface BookProps {
    number: number;
    title: string;
    originalTitle: string;
    releaseDate: string;
    description: string;
    pages: number;
    cover: string;
    index: number;
}

export interface PostProps {
    id?: string;
    title: string;
    views: number;
}

export interface UserProps {
    email: string;
    password: string;
}

export interface PostFilters {
    q?: string;
    views_gte?: number;
    views_lte?: number;
    _sort?: string;
    _order?: 'asc' | 'desc';
    _page?: number;
    _limit?: number;
}

export interface PaginatedResponse<T> {
    data?: T[],
    pages?: number,
    items?: number
}
