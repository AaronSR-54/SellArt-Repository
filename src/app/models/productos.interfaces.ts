export interface ProductoResponse{
    id: number;
    attributes: {
        name: string;
        price: number;
        description: string;
        image: {
            data: {
                id:number
                attributes: {
                    name: string;
                    url: string;
                }
            }
        };
        accesorio_tipo: {
            data: {
                id: number,
                attributes: {
                    name: string,
                }
            }
        },
        figura_tipo: {
            data: {
                id: number,
                attributes: {
                    name: string,
                }
            }
        },
        pintura_tipo: {
            data: {
                id: number,
                attributes: {
                    name: string,
                }
            }
        },
        producto_tipo: {
            data: {
                id: number,
                attributes: {
                    name: string,
                }
            }
        }
    }
}
