export interface Figura {
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
}

export interface FiguraTipo {
    id: number;
    name: string;
}

export interface Pintura {
    id: number;
    name: string;
    price_int: number;
    price_dec: string;
    description: string;
    image: {
        name: string;
        url: string;
    }
    pintura_tipo: {
        id: number;
        name: string;
    }
}

export interface PinturaTipo {
    id: number;
    name: string;
}


export interface Accesorio {
    id: number;
    name: string;
    price_int: number;
    price_dec: string;
    description: string;
    image: {
        name: string;
        url: string;
    }
    accesorio_tipo: {
        id: number;
        name: string;
    }
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
    accesorios: number[];
    pinturas: number[];
    figuras: number[];
}

export type Figuras = Figura[];
export type FiguraTipos = FiguraTipo[];
export type Pinturas = Pintura[];
export type PinturaTipos = PinturaTipo[];
export type Accesorios = Accesorio[];
export type AccesorioTipos = AccesorioTipo[];
export type Users = User[];