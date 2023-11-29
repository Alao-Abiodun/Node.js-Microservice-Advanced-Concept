import { jest, describe, test, expect, afterEach, beforeEach } from "@jest/globals";
import { ICatalog } from "../../interface/catalog.interface";
import { MockCatalogRepository } from "../../repository/mock.repository";
import { CatalogService } from "../catalog.service";
import {  faker } from '@faker-js/faker';
import { Product } from "../../models/product.model";
import { Factory } from "rosie";

const productFactory = new Factory<Product>()
    .attr('id', faker.number.int({min: 1, max: 1000}))
    .attr('name', faker.commerce.productName())
    .attr('description', faker.commerce.productDescription())
    .attr('stock', faker.number.int({min: 10, max: 100}))
    .attr('price', +faker.commerce.price())

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

    describe("Update Product", () => {

        test('should update a product', async () => {
            const service = new CatalogService(repository);
            const reqBody = mockProduct({
                price: +faker.commerce.price(),
                id: faker.number.int({min: 1, max: 100})
            });
            const result = await service.updateProduct(reqBody);
            expect(result).toMatchObject(reqBody)
        })

        test('should throw an error with product does not exist', async () => {
            const service = new CatalogService(repository);
    
            jest.spyOn(repository, 'update').mockImplementationOnce(() => {
                return new Promise((resolve, reject) => {
                    reject(new Error('Product does not exist'))
                })
            })
    
            await expect(service.updateProduct({})).rejects.toThrowError('Product does not exist');
         })

    })

    describe("Get Product By Limit and Offset", () => {
        
        test("should return a list of products", async () => {
            const service = new CatalogService(repository);
            const randomLimit = faker.number.int({min: 10, max: 50});

            const products: any = productFactory.buildList(randomLimit);

            jest.spyOn(repository, 'find').mockImplementationOnce(() => Promise.resolve(products)) 

            const result = await service.getProducts(randomLimit, 0);
            expect(result.length).toBe(randomLimit);
            expect(result).toMatchObject(products);
        })

        test("should throw error if product does not exist", async () => {
            const service = new CatalogService(repository);

            jest.spyOn(repository, 'find').mockImplementationOnce(() => Promise.reject(new Error('Product does not exist'))) 

            await expect(service.getProducts(0, 0)).rejects.toThrowError('Product does not exist');
        })
    })


    describe("Get Product By Id", () => {
            
            test("should return a product", async () => {
                const service = new CatalogService(repository);
                const product: any = productFactory.build();
    
                jest.spyOn(repository, 'findById').mockImplementationOnce(() => Promise.resolve(product)) 
    
                const result = await service.getProduct(product.id);
                expect(result).toMatchObject(product);
            })
    
            test("should throw error if product does not exist", async () => {
                const service = new CatalogService(repository);
    
                jest.spyOn(repository, 'findById').mockImplementationOnce(() => Promise.reject(new Error('Product does not exist'))) 
    
                await expect(service.getProduct(0)).rejects.toThrowError('Product does not exist');
            })
        })

    
    describe("Delete Product", () => {
                
                test("should delete a product", async () => {
                    const service = new CatalogService(repository);
                    const product: any = productFactory.build();
        
                    jest.spyOn(repository, 'delete').mockImplementationOnce(() => Promise.resolve({id: product.id})) 
        
                    const result = await service.deleteProduct(product.id);
                    expect(result).toMatchObject({
                        id: expect.any(Number)
                    });
                })
        
                test("should throw error if product does not exist", async () => {
                    const service = new CatalogService(repository);
        
                    jest.spyOn(repository, 'delete').mockImplementationOnce(() => Promise.reject(new Error('Product does not exist'))) 
        
                    await expect(service.deleteProduct(0)).rejects.toThrowError('Product does not exist');
                })
    })
})
