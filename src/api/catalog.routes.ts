import express, { NextFunction, Request, Response } from 'express';
import { CreateProductRequestDto } from '../dto/product.dto';
import { CatalogRepository } from '../repository/catalog.repository';
import { CatalogService } from '../service/catalog.service';
import { RequestValidator } from '../utils/requestValidator';

const router = express.Router();

export const catalogService = new CatalogService(new CatalogRepository());

router.post('/product', async (req: Request, res: Response, next: NextFunction) => {
    const { errors, input } = await RequestValidator(CreateProductRequestDto, req.body);

    if (errors) return res.status(400).json(errors);

    const data = await catalogService.createProduct(input);

    res.status(201).json(data);
})

export default router;