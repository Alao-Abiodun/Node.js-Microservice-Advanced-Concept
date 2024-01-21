import request from 'supertest';
import express from 'express';
import {faker} from '@faker-js/faker';
import { Factory } from 'rosie';
import catalogRoutes, { catalogService } from '../catalog.routes';
import { ProductFactory } from '../../utils/fixtures';

const app = express();
app.use(express.json());
app.use(catalogRoutes);

const mockRequest = () => {
    return {
        id: 1,
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        stock: faker.number.int({min: 1, max: 100}),
        price: +faker.commerce.price(),
    }
}

describe('Catalog Routes', () => {
    describe('POST /product', () => {
        test('should create a product', async () => {
            const reqBody = mockRequest();
            const product = ProductFactory.build();

            jest.spyOn(catalogService, 'createProduct').mockImplementationOnce(() => Promise.resolve(product));

            const response = await request(app)
                .post('/product')
                .send(reqBody)
                .set('Accept', 'application/json');

                console.log("TEST", response);

            expect(response.status).toBe(201);
            expect(response.body).toEqual(product);
        });

        test('should response with 400 validation error', async () => {
            const reqBody = mockRequest();

            const response = await request(app)
                .post('/product')
                .send({ ...reqBody, name: '' })
                .set('Accept', 'application/json');
                console.log("TEST", response);

            expect(response.status).toBe(400);
            expect(response.body).toEqual('name should not be empty');
        });

        test('should response with an internal error code 500', async () => {
            const reqBody = mockRequest();

            jest.spyOn(catalogService, 'createProduct').mockImplementationOnce(() => Promise.reject(new Error("new occured on create product")));

            const response = await request(app)
                .post('/product')
                .send(reqBody)
                .set('Accept', 'application/json');
                console.log("TEST", response);

            expect(response.status).toBe(500);
            expect(response.body).toEqual('new occured on create product');
        });
    });

    describe('PATCH /product/:id', () => {
        test('should update a product', async () => {
            const product = ProductFactory.build();
            const reqBody = {
                name: product.name,
                price: product.price,
                stock: product.stock,
            }

            jest.spyOn(catalogService, 'updateProduct').mockImplementationOnce(() => Promise.resolve(product));

            const response = await request(app)
                .patch(`/product/${product.id}`)
                .send(reqBody)
                .set('Accept', 'application/json');

                console.log("TEST", response);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(product);
        });

        test('should response with 400 validation error', async () => {
            const product = ProductFactory.build();

            const reqBody = {
                name: product.name,
                price: -1,
                stock: product.stock,
            }

            const response = await request(app)
                .patch(`/product/${product.id}`)
                .send({ ...reqBody})
                .set('Accept', 'application/json');

            expect(response.status).toBe(400);
            expect(response.body).toEqual('price must not be less than 1');
        });

        test('should response with an internal error code 500', async () => {
            const product = ProductFactory.build();
            const reqBody = mockRequest();

            jest.spyOn(catalogService, 'updateProduct').mockImplementationOnce(() => Promise.reject(new Error("Unable to update product")));

            const response = await request(app)
                .patch(`/product/${product.id}`)
                .send(reqBody)
                .set('Accept', 'application/json');
                console.log("TEST", response);

            expect(response.status).toBe(500);
            expect(response.body).toEqual('Unable to update product');
        });
    });

    describe('GET /product?limit=0&offset=0', () => {
        test('should return a range of products based on limit and offset', async () => {
            const randomLimit = faker.number.int({min: 10, max: 50});

            const products: any = ProductFactory.buildList(randomLimit);

            jest.spyOn(catalogService, 'getProducts').mockImplementationOnce(() => Promise.resolve(products));

            const response = await request(app)
                .get(`/product?limit=${randomLimit}&offset=0`)
                .set('Accept', 'application/json');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(products);
        });

        // ASSIGNMENT 1
        // test('should response with 400 validation error', async () => {
        //     const product = ProductFactory.build();

        //     const reqBody = {
        //         name: product.name,
        //         price: -1,
        //         stock: product.stock,
        //     }

        //     const response = await request(app)
        //         .patch(`/product/${product.id}`)
        //         .send({ ...reqBody})
        //         .set('Accept', 'application/json');

        //     expect(response.status).toBe(400);
        //     expect(response.body).toEqual('price must not be less than 1');
        // });

        // ASSIGNMENT 2
        // test('should response with an internal error code 500', async () => {
        //     const product = ProductFactory.build();
        //     const reqBody = mockRequest();

        //     jest.spyOn(catalogService, 'updateProduct').mockImplementationOnce(() => Promise.reject(new Error("Unable to update product")));

        //     const response = await request(app)
        //         .patch(`/product/${product.id}`)
        //         .send(reqBody)
        //         .set('Accept', 'application/json');
        //         console.log("TEST", response);

        //     expect(response.status).toBe(500);
        //     expect(response.body).toEqual('Unable to update product');
        // });
    });

    describe('GET /product/:id', () => {
        test('should return a single of products based on the id', async () => {
            const product: any = ProductFactory.build();

            jest.spyOn(catalogService, 'getProduct').mockImplementationOnce(() => Promise.resolve(product));

            const response = await request(app)
                .get(`/product/${product.id}`)
                .set('Accept', 'application/json');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(product);
        });

        // ASSIGNMENT 1
        // test('should response with 400 validation error', async () => {
        //     const product = ProductFactory.build();

        //     const reqBody = {
        //         name: product.name,
        //         price: -1,
        //         stock: product.stock,
        //     }

        //     const response = await request(app)
        //         .patch(`/product/${product.id}`)
        //         .send({ ...reqBody})
        //         .set('Accept', 'application/json');

        //     expect(response.status).toBe(400);
        //     expect(response.body).toEqual('price must not be less than 1');
        // });

        // ASSIGNMENT 2
        // test('should response with an internal error code 500', async () => {
        //     const product = ProductFactory.build();
        //     const reqBody = mockRequest();

        //     jest.spyOn(catalogService, 'updateProduct').mockImplementationOnce(() => Promise.reject(new Error("Unable to update product")));

        //     const response = await request(app)
        //         .patch(`/product/${product.id}`)
        //         .send(reqBody)
        //         .set('Accept', 'application/json');
        //         console.log("TEST", response);

        //     expect(response.status).toBe(500);
        //     expect(response.body).toEqual('Unable to update product');
        // });
    });

    describe('DELETE /product/:id', () => {
        test('should delete a product by id', async () => {
            const product: any = ProductFactory.build();

            jest.spyOn(catalogService, 'deleteProduct').mockImplementationOnce(() => Promise.resolve({ id: product.id }));

            const response = await request(app)
                .delete(`/product/${product.id}`)
                .set('Accept', 'application/json');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ id: product.id });
        });

        // ASSIGNMENT 1
        // test('should response with 400 validation error', async () => {
        //     const product = ProductFactory.build();

        //     const reqBody = {
        //         name: product.name,
        //         price: -1,
        //         stock: product.stock,
        //     }

        //     const response = await request(app)
        //         .patch(`/product/${product.id}`)
        //         .send({ ...reqBody})
        //         .set('Accept', 'application/json');

        //     expect(response.status).toBe(400);
        //     expect(response.body).toEqual('price must not be less than 1');
        // });

        // ASSIGNMENT 2
        // test('should response with an internal error code 500', async () => {
        //     const product = ProductFactory.build();
        //     const reqBody = mockRequest();

        //     jest.spyOn(catalogService, 'updateProduct').mockImplementationOnce(() => Promise.reject(new Error("Unable to update product")));

        //     const response = await request(app)
        //         .patch(`/product/${product.id}`)
        //         .send(reqBody)
        //         .set('Accept', 'application/json');
        //         console.log("TEST", response);

        //     expect(response.status).toBe(500);
        //     expect(response.body).toEqual('Unable to update product');
        // });
    });
});
