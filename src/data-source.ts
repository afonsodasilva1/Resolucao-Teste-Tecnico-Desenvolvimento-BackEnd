import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from 'typeorm';
import { Client } from './Models/client.model';
import { Product } from './Models/product.model';
import { Sale } from './Models/sales.model';

const port = Number(process.env.DB_PORT)

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Client, Product, Sale], 
  migrations: [`${__dirname}/**/migrations/*.{ts, js}`], 

})
