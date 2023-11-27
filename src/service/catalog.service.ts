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

    updateProduct(id: number, input: any) {}

    deleteProduct(id: number) {}

    getProduct(id: number) {}

    getProducts(limit: number, offset: number) {}
}