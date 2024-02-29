import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientController } from "src/controllers/client.controller";
import { Client } from "src/Models/client.model";
import { ClientService } from "src/services/client.service";

@Module({
    imports: [TypeOrmModule.forFeature([Client])],
    controllers: [ClientController],
    providers: [ClientService]
})

export class ClientModule { }
