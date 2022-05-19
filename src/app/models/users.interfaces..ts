export interface UserResponse {
    id: number;
    username: string;
    email: string;
    biography: string;
    avatar: {
        name: string | null;
        url: string | null;
    }
    accesorios: number[];
    pinturas: number[];
    figuras: number[];
}

