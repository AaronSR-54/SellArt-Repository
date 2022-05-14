export interface AccesorioResponse {
    id: number;
    attributes: {
        name: string;
        price: number;
        image: {
            data: {
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
        }
    }
}
