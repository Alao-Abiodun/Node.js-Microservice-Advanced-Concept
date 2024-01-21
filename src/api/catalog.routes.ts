import express, { NextFunction, Request, Response } from 'express';
import { CreateProductRequestDto, UpdateProductRequest } from '../dto/product.dto';
import { CatalogRepository } from '../repository/catalog.repository';
import { CatalogService } from '../service/catalog.service';
import { RequestValidator } from '../utils/requestValidator';

const router = express.Router();

export const catalogService = new CatalogService(new CatalogRepository());

router.post('/product', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { errors, input } = await RequestValidator(CreateProductRequestDto, req.body);

        if (errors) return res.status(400).json(errors);

        const data = await catalogService.createProduct(input);

        res.status(201).json(data);
    } catch (error) {
        const err = error as Error;
        return res.status(500).json(err.message);
    }
})

router.patch('/product/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { errors, input } = await RequestValidator(UpdateProductRequest, req.body);

        const id = parseInt(req.params.id) || 0;

        if (errors) return res.status(400).json(errors);

        const data = await catalogService.updateProduct({id, ...input});

        res.status(200).json(data);
    } catch (error) {
        const err = error as Error;
        return res.status(500).json(err.message);
    }
})

router.get('/product', async (req: Request, res: Response, next: NextFunction) => {
    const limit = Number(req.query['limit']);
    const offset = Number(req.query['offset']);
    try {
        const data = await catalogService.getProducts(limit, offset);

        res.status(200).json(data);
    } catch (error) {
        const err = error as Error;
        return res.status(500).json(err.message);
    }
})

router.get('/product/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id) || 0;
    try {
        const data = await catalogService.getProduct(id);

        res.status(200).json(data);
    } catch (error) {
        const err = error as Error;
        return res.status(500).json(err.message);
    }
})

router.delete('/product/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id) || 0;
    try {
        const data = await catalogService.deleteProduct(id);

        res.status(200).json(data);
    } catch (error) {
        const err = error as Error;
        return res.status(500).json(err.message);
    }
})

export default router;