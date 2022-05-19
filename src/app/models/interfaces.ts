export interface Producto {
    id: number;
    name: string;
    price_int: number;
    price_dec: string;
    description: string;
    image: {
        name: string;
        url: string;
    }
    figura_tipo: {
        id: number;
        name: string;
    }
    pintura_tipo: {
        id: number;
        name: string;
    }
    accesorio_tipo: {
        id: number;
        name: string;
    }
    producto_tipo: {
        id: number;
        name: string;
    }
}

export interface FiguraTipo {
    id: number;
    name: string;
}

export interface PinturaTipo {
    id: number;
    name: string;
}

export interface AccesorioTipo {
    id: number;
    name: string;
}

export interface User {
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

export type Productos = Producto[];
export type FiguraTipos = FiguraTipo[];
export type PinturaTipos = PinturaTipo[];
export type AccesorioTipos = AccesorioTipo[];
export type Users = User[];