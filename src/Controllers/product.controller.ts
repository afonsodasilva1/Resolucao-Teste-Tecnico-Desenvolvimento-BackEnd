import { Body, Controller, Delete, Get, Param, Post, Put, Res } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Response } from "express"
import { ProductDto } from "src/DTO/product.dto"
import { ProductService } from "src/services/product.service"
import dataSource from "src/db/data-source-cli"
import { Product } from "src/Models/product.model"
import { Repository } from "typeorm"

@Controller('/product')
export class ProductController {

    constructor(
        private readonly productService: ProductService
    ) { }

    @Post()
    public async create(@Res() response: Response, @Body() productDTO: ProductDto) {
        const productCreated = await this.productService.create(productDTO);
        return response.status(201).json(productCreated)
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Res() response: Response) {
        const product = await this.productService.findProductById(id);
        if (!product) {
            return response.status(404).json({ message: 'Product not found' });
        }
        return response.status(200).json(product);
    }

    @Get()
    async findAll(@Res() response: Response) {
        const products = await this.productService.findAllProducts();
        return response.status(200).json(products);
    }

    @Put('/update/:id')
    async update(@Param('id') id: string, @Body() productDTO: ProductDto, @Res() response: Response) {
        const updatedProduct = await this.productService.updateProduct(id, productDTO);
        return response.status(200).json(updatedProduct);
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: string, @Res() response: Response) {
        await this.productService.deleteProduct(id);
        return response.status(204).send();
    }
    
    
}