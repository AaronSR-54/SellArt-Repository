export interface Figura {
    id: number;
    name: string;
    price_int: number;
    price_dec: string;
    image: {
        name: string;
        url: string;
    }
    figura_tipo: {
        id: number;
        name: string;
    }
}

export interface Pintura {
    id: number;
    name: string;
    price_int: number;
    price_dec: string;
    image: {
        name: string;
        url: string;
    }
    pintura_tipo: {
        id: number;
        name: string;
    }
}

export interface Accesorio {
    id: number;
    name: string;
    price_int: number;
    price_dec: string;
    image: {
        name: string;
        url: string;
    }
    accesorio_tipo: {
        id: number;
        name: string;
    }
}

export type Figuras = Figura[];
export type Pinturas = Pintura[];
export type Accesorios = Accesorio[];