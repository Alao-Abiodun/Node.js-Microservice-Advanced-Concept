import { ICatalog } from "../interface/catalog.interface";

export class CatalogService {

    private _repository: ICatalog

    constructor(repository: ICatalog) {
        this._repository = repository;
    }

    createProduct(input: any) {}

    updateProduct(id: number, input: any) {}

    deleteProduct(id: number) {}

    getProduct(id: number) {}

    getProducts(limit: number, offset: number) {}
}