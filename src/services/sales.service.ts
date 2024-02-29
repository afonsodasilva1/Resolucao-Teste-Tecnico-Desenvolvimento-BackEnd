import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SaleDto } from "src/DTO/sales.dto";
import { Sale } from "src/Models/sales.model";
import { Repository } from "typeorm";

@Injectable()
export class SaleService {
    constructor(
        @InjectRepository(Sale)
        private readonly saleRepository: Repository<Sale>
    ) { }
  
    async create(saleDTO: SaleDto): Promise<SaleDto> {
        const sale = new Sale();
        sale.client = saleDTO.client;
        sale.products = saleDTO.products;
        sale.date = saleDTO.date;
        sale.total = saleDTO.total;

        const saleCreated = await this.saleRepository.save(sale);
        return saleCreated;
    }

    async findAllSales(): Promise<Sale[]> {
        const sales = await this.saleRepository.find();
        if (sales.length === 0) {
            throw new HttpException('No sales found!', HttpStatus.NOT_FOUND);
        }
        return sales;
    }

    async findSaleById(id: string): Promise<Sale | undefined> {
        const sale = await this.saleRepository.findOne({ where: { id: id } });
        if (!sale) {
            throw new HttpException('Sale not found!', HttpStatus.NOT_FOUND);
        }
        return sale;
    }

    async updateSale(id: string, saleDTO: SaleDto) {
         
        if (!saleDTO.products) {
            throw new HttpException('Product is required for updating sale!', HttpStatus.BAD_REQUEST);
        }

        const saleUpdated = await this.saleRepository.update(id, saleDTO);
        if (saleUpdated.affected === 0) {
            throw new HttpException('Sale not found!', HttpStatus.NOT_FOUND);
        }
        return saleUpdated;
    }

    async deleteSale(id: string): Promise<void> {
        const result = await this.saleRepository.delete(id);
        if (result.affected === 0) {
            throw new HttpException('Sale not found!', HttpStatus.NOT_FOUND);
        }
    }
}
