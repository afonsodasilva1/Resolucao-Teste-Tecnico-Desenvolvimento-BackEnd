import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;
      
    @Column('varchar')
    name: string

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;
}