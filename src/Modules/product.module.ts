import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductService } from "src/services/product.service";
import { ProductController } from "src/controllers/product.controller";
import { Product } from "src/Models/product.model";
 
@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule { }