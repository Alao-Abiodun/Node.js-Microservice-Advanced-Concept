import { Product } from "../models/product.model";

export interface ICatalog {
 
    create(data: Product): Promise<Product>;

    update(data: any): Promise<Product>;

    delete(id: number): any;

    findOne(data: any): Promise<Product>;

    find(limit: number, offset: number): Promise<any>;

    findById(id: number): Promise<Product>;
}