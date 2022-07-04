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