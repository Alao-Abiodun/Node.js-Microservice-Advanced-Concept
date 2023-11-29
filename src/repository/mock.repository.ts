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

    update(data: any): Promise<Product> {
        return new Promise((resolve, reject) => {
            resolve({
                ...data
            })
         }
        )
    }

    delete(id: number): Promise<{}> {
        return Promise.resolve(id)
    }

    findOne(data: any): Promise<Product> {
        throw new Error("Method not implemented.");
    }

    find(limit: number, offset: number): Promise<any> {
        return Promise.resolve([]); 
    }
    
    findById(id: number): Promise<Product> {
        return Promise.resolve({} as Product)
    }


}