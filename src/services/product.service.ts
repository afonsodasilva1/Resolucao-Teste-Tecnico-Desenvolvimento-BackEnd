import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/Models/product.model";
import { Repository } from "typeorm";
import { ProductDto } from "../DTO/product.dto";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) { }

    async findAllProducts(): Promise<Product[]> {
        const product = await this.productRepository.find();
        if (product.length === 0) {
            throw new HttpException('No product found!', HttpStatus.NOT_FOUND);
        }
        return product;
    }

    async findProductById(id: string): Promise<Product | undefined> {
        const client = await this.productRepository.findOne({ where: { id: id } });
        if (!client) {
            throw new HttpException('Product not found!', HttpStatus.NOT_FOUND);
        }
        return client;
    }

    async create(productDTO: ProductDto): Promise<ProductDto> {
        const createProduct = await this.productRepository.save(productDTO);
        return createProduct;
    }

    async updateProduct(id: string, clientDTO: ProductDto) {

        if (!clientDTO.name) {
            throw new HttpException('Name is required for updating client!', HttpStatus.BAD_REQUEST);
        }

        const clientUpdated = await this.productRepository.update(id, clientDTO);
        if (clientUpdated.affected === 0) {
            throw new HttpException('Product not found!', HttpStatus.NOT_FOUND);
        }
        return clientUpdated;
    }

    async deleteProduct(id: string): Promise<void> {
        const result = await this.productRepository.delete(id);
        if (result.affected === 0) {
            throw new HttpException('Product not found!', HttpStatus.NOT_FOUND);
        }
    }
}
