"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogService = void 0;
class CatalogService {
    constructor(repository) {
        this._repository = repository;
    }
    createProduct(input) { }
    updateProduct(id, input) { }
    deleteProduct(id) { }
    getProduct(id) { }
    getProducts(limit, offset) { }
}
exports.CatalogService = CatalogService;
