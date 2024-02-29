import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { Client } from "./client.model";
import { Product } from "./product.model";

@Entity()
export class Sale {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Client, client => client.sales)
    @JoinColumn({ name: 'client_id' })
    client: Client;

    @ManyToMany(() => Product)
    @JoinTable({
        name: 'sale_product',
        joinColumn: { name: 'sale_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' }
    })
    products: Product[];

    @CreateDateColumn({ type: 'timestamp' })
    date: Date

    @Column({ name: 'total', type: 'decimal', precision: 10, scale: 2 })
    total: number;
}