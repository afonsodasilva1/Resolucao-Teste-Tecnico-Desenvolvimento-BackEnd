import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SaleService } from "src/services/sales.service";
import { SaleController } from "src/controllers/sales.controller";
import { Sale } from "src/Models/sales.model";
 
@Module({
    imports: [TypeOrmModule.forFeature([Sale])],
    controllers: [SaleController],
    providers: [SaleService]
})
export class SaleModule { }