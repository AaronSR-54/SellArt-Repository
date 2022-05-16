export interface FiguraResponse {
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