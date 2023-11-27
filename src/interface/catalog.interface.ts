import { Product } from "../models/product.model";

export interface ICatalog {
 
    create(data: Product): Promise<Product>;

    update(id: number, data: any): Promise<Product>;

    delete(id: number): any;

    findOne(data: any): Promise<Product>;

    find(): Promise<Product[]>;

    findById(id: number): Promise<Product[]>;
}