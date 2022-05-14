export interface FiguraResponse {
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
        figura_tipo: {
            data: {
                id: number,
                attributes: {
                    name: string,
                }
            }
        }
    }
}