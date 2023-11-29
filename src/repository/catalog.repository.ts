import { ICatalog } from "../interface/catalog.interface";
import { Product } from "../models/product.model";

export class CatalogRepository implements ICatalog {

    create(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    update(data: any): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<{}> {
        throw new Error("Method not implemented.");
    }
    findOne(data: any): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    find(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<Product> {
        throw new Error("Method not implemented.");
    }


}