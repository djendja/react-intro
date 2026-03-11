export interface TokenPayload {
    sub: number;
    email: string;
    iat: number;
    exp: number;
}

export function decodeToken(token: string): TokenPayload {
    const [, payload] = token.split(".");

    console.log(JSON.parse(atob(payload || "")));

    return JSON.parse(atob(payload || "")) as TokenPayload
}

export function isTokenExpired(token: string): boolean {
    const { exp } = decodeToken(token);
    return Date.now() >= exp * 1000;
}