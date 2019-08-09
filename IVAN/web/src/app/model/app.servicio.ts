export class Cliente{
    public codigo: number;
    public nombres:string;
    public empresa:string;
    constructor(){}
}

export class Producto{
    public codigo:number;
    public descrpcion:string;
    public precio:string;
    constructor(){}
}

export class Servicio{
    public codigo:number;
    public estado:string;
    public monto:string;
    public cliente: Cliente;
    public producto: Producto;
    public indSave:string;
    constructor(){}
}
