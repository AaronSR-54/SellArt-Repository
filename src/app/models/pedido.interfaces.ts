import { UserResponse } from "./users.interfaces.";

export interface PedidoRequest{
    data: {
        user : number;
        Direccion : string;
        Localidad : string;
        MetodoPago : string;
        NumTarjeta : string;
        CadTarjeta : string;
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
        Direccion : string;
        Localidad : string;
        MetodoPago : string;
        NumTarjeta : string;
        CadTarjeta : string;
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