import { Product } from "src/Models/product.model";
import { Client } from "src/models/client.model";


export class SaleDto {
    readonly id?: string;
    readonly client: Client;
    readonly products: Product[];
    readonly date?: Date;
    readonly total: number;
}
