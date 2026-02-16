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
