import { Productos } from "./interfaces";

export interface UserResponse {
    id: number;
    username: string;
    email: string;
    biography: string;
    avatar: {
        name: string | null;
        url: string | null;
    }
    productos: any;
}

