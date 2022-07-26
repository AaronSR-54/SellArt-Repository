export interface PedidoRequest{
    data: {
        user : number;
        direccion : string;
        localidad : string;
        metodoPago : string;
        numTarjeta : string;
        cadTarjeta : string;
        pedido_productos : number[];
    }
}

export interface ProductoRequest{
    data: {
        name : string;
        price_int : number;
        price_dec : number;
        image : number;
        cantidad : number;
    }
}

export interface PedidoResponse{
    id : number,
    attributes: {
        direccion : string;
        localidad : string;
        metodoPago : string;
        numTarjeta : string;
        cadTarjeta : string;
        createdAt : Date;
        estado: string;
        pedido_productos : {
            data : any
        }
        user : {
            data: {
                id: number,
                attributes:{
                    username : string,
                    email : string,
                }
            }
        }
    }
}

export interface PedidoProductoResponse{
    data : {
        id : number,
        attributes: {
            name : string;
            price_int : number;
            price_dec : number;
            image: {
                data : {
                    id:number
                    attributes: {
                        name: string;
                        url: string;
                    }
                }
            };
            cantidad : number;
        }
    }
}