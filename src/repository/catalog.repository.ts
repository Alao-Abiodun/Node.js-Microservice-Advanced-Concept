import { PrismaClient } from "@prisma/client";
import { ICatalog } from "../interface/catalog.interface";
import { Product } from "../models/product.model";

export class CatalogRepository implements ICatalog {

    _prisma: PrismaClient;

    constructor() {
        this._prisma = new PrismaClient();
    }

    async create(data: Product): Promise<Product> {
        return this._prisma.product.create({ data })
    }


    async update(data: Product): Promise<Product> {
        return this._prisma.product.update({
            where: { id: data.id },
            data
        })
    }


    async delete(id: any): Promise<{}> {
        return this._prisma.product.delete({
            where: { id }
        })
    }


    async findOne(data: any): Promise<Product> {
        const product = await this._prisma.product.findFirst({
            where:  data 
        })

        if (product) {
            return Promise.resolve(product);
        }

        return Promise.reject(new Error('Product not found'));
    }

    async find(limit: number, offset: number): Promise<Product[]> {
        return this._prisma.product.findMany({
            take: limit,
            skip: offset
        })
    }


    async findById(id: number): Promise<Product> {
        const product = await this._prisma.product.findUnique({
            where: { id }
        })

        if (product) {
            return Promise.resolve(product);
        }

        return Promise.reject(new Error('Product not found'));
    }
    
}