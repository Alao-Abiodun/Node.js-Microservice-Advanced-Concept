import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductRequestDto {
    @IsString()
    @IsNotEmpty()
    "name": string;

    @IsString()
    "description": string;

    @IsNotEmpty()
    @Min(1)
    "stock": number;

    @IsNumber()
    "price": number;
}

export class UpdateProductRequest {

    "name"?: string;

    "description": string;

    "stock"?: number;

    @Min(1)
    "price"?: number;
}