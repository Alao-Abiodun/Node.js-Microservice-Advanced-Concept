import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductRequestDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;

    @IsNotEmpty()
    @Min(1)
    stock: number;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}