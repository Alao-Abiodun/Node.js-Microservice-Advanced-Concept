import { ICatalog } from "../interface/catalog.interface";

export class CatalogService {

    private _repository: ICatalog

    constructor(repository: ICatalog) {
        this._repository = repository;
    }

    async createProduct(input: any) {
        const product = await this._repository.create(input);
        if (!product.id) {
            throw new Error('Unable to create product');
        }
        return product;
    }

    async updateProduct(input: any) {
        const product = await this._repository.update(input);

        if (!product.id) {
            throw new Error('Unable to update product');
        }
        // emit the event to update record in elastic search service
        return product;
    }

    async deleteProduct(id: number) {
        const product = this._repository.delete(id);
        return product;
    }

    async getProduct(id: number) {
        const product = this._repository.findById(id);
        // Also delete the product from elastic search service
        return product;
    }

    // instead we get product from elastic search service
    async getProducts(limit: number, offset: number) {
        const products = await this._repository.find(limit, offset);
        return products;
    }
}