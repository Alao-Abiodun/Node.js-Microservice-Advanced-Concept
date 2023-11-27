import { jest, describe, test, expect, afterEach, beforeEach } from "@jest/globals";
import { ICatalog } from "../../interface/catalog.interface";
import { MockCatalogRepository } from "../../repository/mock.repository";
import { CatalogService } from "../catalog.service";
import {  faker } from '@faker-js/faker';
import { Product } from "../../models/product.model";

const mockProduct = (rest: any) => {
    return {
        id: 1,
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        stock: faker.number.int({min: 1, max: 100}),
        ...rest
    }
}

describe("Catalog Service", () => {
    let repository: ICatalog

    beforeEach(() => {
        repository = new MockCatalogRepository()
    });

    afterEach(() => {
        repository = {} as MockCatalogRepository;
    });

    describe("Create Product", () => {

        test('should create a product', async () => {
            const service = new CatalogService(repository);
            const reqBody = mockProduct({
                price: +faker.commerce.price(),
            });
            const result = await service.createProduct(reqBody);
            expect(result).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String),
                description: expect.any(String),
                price: expect.any(Number),
                stock: expect.any(Number),
            })
        })

        test('should throw an error if unable to create product', async () => {
                const service = new CatalogService(repository);

                const reqBody = mockProduct({
                    price: +faker.commerce.price(),
                });


                jest.spyOn(repository, 'create').mockImplementationOnce(() => {
                    return new Promise((resolve, reject) => {
                        resolve( {} as Product)
                    })
                })

                await expect(service.createProduct(reqBody)).rejects.toThrowError('Unable to create product');
        })

        test('should throw an error if product already exist', async () => {
            const service = new CatalogService(repository);

            const reqBody = mockProduct({
                price: +faker.commerce.price(),
            });


            jest.spyOn(repository, 'create').mockImplementationOnce(() => {
                return new Promise((resolve, reject) => {
                    reject(new Error('Product already exist'))
                })
            })

            await expect(service.createProduct(reqBody)).rejects.toThrowError('Product already exist');
    })
    })
})
