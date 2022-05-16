export interface AccesorioResponse {
    id: number;
    attributes: {
        name: string;
        price: number;
        description: string;
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
