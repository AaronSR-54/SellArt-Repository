export interface PinturaResponse {
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
        pintura_tipo: {
            data: {
                id: number,
                attributes: {
                    name: string,
                }
            }
        }
    }
}
