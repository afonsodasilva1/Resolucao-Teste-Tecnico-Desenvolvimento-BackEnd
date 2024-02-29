// client.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put, Res } from "@nestjs/common";
import { Response } from 'express';
import { ClientService } from "src/services/client.service";
import { ClientDto } from '../DTO/client.dto';

@Controller('/client')
export class ClientController {
    constructor(
        private readonly clientService: ClientService
    ) { }

    @Post()
    async create(@Res() response: Response, @Body() clientDTO:ClientDto) {
        const clientCreated = await this.clientService.createClient(clientDTO);
        
        return response.status(201).json(clientCreated);
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Res() response: Response) {
        const client = await this.clientService.findClientById(id);
        if (!client) {
            return response.status(404).json({ message: 'Client not found' });
        }
        return response.status(200).json(client);
    }

    @Get()
    async findAll(@Res() response: Response) {
        const clients = await this.clientService.findAllClients();
        return response.status(200).json(clients);
    }

    @Put('/update/:id')
    async update(@Param('id') id: string, @Body() clientDTO: ClientDto, @Res() response: Response) {
        const updatedClient = await this.clientService.updateClient(id, clientDTO);
        return response.status(200).json(updatedClient);
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: string, @Res() response: Response) {
        await this.clientService.deleteClient(id);
        return response.status(204).send();
    }
}
