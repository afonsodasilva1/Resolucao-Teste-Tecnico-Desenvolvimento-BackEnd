import { Module } from '@nestjs/common';
import { ClientModule } from './modules/client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './Modules/product.module';
import { Client } from './Models/client.model';
import { Product } from './Models/product.model';
import { SaleModule } from './Modules/sales.module';
import { Sale } from './Models/sales.model';

const port = Number(process.env.DB_PORT)

@Module({
  imports: [
    ConfigModule.forRoot()
    ,
    TypeOrmModule.forRoot({
      type: "postgres", 
      host: process.env.DB_HOST,
      port: port,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Client, Product, Sale],
      migrations: [`${__dirname}//migrations/*.js}`],
      synchronize: true, 
    }),
    ClientModule,
    ProductModule,
    SaleModule,
  ],

})
export class AppModule { }
