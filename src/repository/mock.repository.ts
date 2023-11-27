import { ICatalog } from "../interface/catalog.interface";
import { Product } from "../models/product.model";

export class MockCatalogRepository implements ICatalog {

    create(data: Product): Promise<Product> {
        return new Promise((resolve, reject) => {
            resolve({
                ...data
            })
        })
    }

    update(id: number, data: any): Promise<Product> {
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
    
    findById(id: number): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }


}