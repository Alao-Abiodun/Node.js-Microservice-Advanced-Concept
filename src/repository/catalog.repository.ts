import { ICatalog } from "../interface/catalog.interface";
import { Product } from "../models/product.model";
import { ProductFactory } from "../utils/fixtures";

export class CatalogRepository implements ICatalog {

    create(data: Product): Promise<Product> {
        const product = ProductFactory.build();
        return Promise.resolve(product)
    }
    update(data: Product): Promise<Product> {
        const product = ProductFactory.build();
        return Promise.resolve(product)
    }
    delete(id: any): Promise<{}> {
        const product = ProductFactory.build();
        return Promise.resolve(product)
    }
    findOne(data: any): Promise<Product> {
        const product = ProductFactory.build();
        return Promise.resolve(product)
    }
    find(limit: number, offset: number): Promise<Product[]> {
        const product = ProductFactory.buildList(limit);
        return Promise.resolve(product)
    }
    findById(id: number): Promise<Product> {
        const product = ProductFactory.build();
        return Promise.resolve(product)
    }


}