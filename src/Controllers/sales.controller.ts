import { Body, Controller, Delete, Get, Param, Post, Put, Res } from "@nestjs/common"
import { Response } from "express"
import { SaleService } from "src/services/sales.service"
import dataSource from "src/db/data-source-cli"
import { Sale } from "src/Models/sales.model"
import { SaleDto } from "src/DTO/sales.dto"

@Controller('/sale')
export class SaleController {

    constructor( 
        private readonly saleService: SaleService
    ) { }

    @Post()
    public async create(@Res() response: Response, @Body() saleDTO: SaleDto) {
        const saleCreated = await this.saleService.create(saleDTO);
        return response.status(201).json(saleCreated)
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Res() response: Response) {
        const sale = await this.saleService.findSaleById(id);
        if (!sale) {
            return response.status(404).json({ message: 'Sale not found' });
        }
        return response.status(200).json(sale);
    }

    @Get()
    async findAll(@Res() response: Response) {
        const sales = await this.saleService.findAllSales();
        return response.status(200).json(sales);
    }

    @Put('/update/:id')
    async update(@Param('id') id: string, @Body() saleDTO: SaleDto, @Res() response: Response) {
        const updatedSale = await this.saleService.updateSale(id, saleDTO);
        return response.status(200).json(updatedSale);
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: string, @Res() response: Response) {
        await this.saleService.deleteSale(id);
        return response.status(204).send();
    }
}