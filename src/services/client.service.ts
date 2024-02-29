import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ClientDto } from "src/DTO/client.dto";
import { Client } from "src/models/client.model";

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>
    ) { }

    async findAllClients(): Promise<Client[]> {
        const clients = await this.clientRepository.find();
        if (clients.length === 0) {
            throw new HttpException('No clients found!', HttpStatus.NOT_FOUND);
        }
        return clients;
    }

    async findClientById(id: string): Promise<Client | undefined> {
        const client = await this.clientRepository.findOne({ where: { id: id } });
        if (!client) {
            throw new HttpException('Client not found!', HttpStatus.NOT_FOUND);
        }
        return client;
    }

    async createClient(clientDTO: ClientDto): Promise<ClientDto> {
        // Validação de entrada de dados
        if (!clientDTO.name) {
            throw new HttpException('Name is required!', HttpStatus.BAD_REQUEST);
        }

        const createClient = await this.clientRepository.save(clientDTO);
        return createClient;
    }

    async updateClient(id: string, clientDTO: ClientDto) {
        // Validação de entrada de dados
        if (!clientDTO.name) {
            throw new HttpException('Name is required for updating client!', HttpStatus.BAD_REQUEST);
        }

        const clientUpdated = await this.clientRepository.update(id, clientDTO);
        if (clientUpdated.affected === 0) {
            throw new HttpException('Client not found!', HttpStatus.NOT_FOUND);
        }
        return clientUpdated;
    }

    async deleteClient(id: string): Promise<void> {
        const result = await this.clientRepository.delete(id);
        if (result.affected === 0) {
            throw new HttpException('Client not found!', HttpStatus.NOT_FOUND);
        }
    }
}
