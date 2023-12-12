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
                .send(reqBody);
                console.log("TEST", response);

            expect(response.status).toBe(201);
            expect(response.body).toMatchObject(product);
        });

        test('should response with 400 validation error', async () => {
            const reqBody = mockRequest();

            const response = await request(app)
                .post('/product')
                .send({ ...reqBody, price: '' });
                console.log("TEST", response);

            expect(response.status).toBe(400);
            expect(response.body).toMatchObject('price is a required field ');
        });
    });
});
