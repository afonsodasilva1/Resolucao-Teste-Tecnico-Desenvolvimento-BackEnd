import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Sale } from "./sales.model";

@Entity()
export class Client {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ name: 'name', unique: true })
    name: string

    @OneToMany(() => Sale, sale => sale.client)
    sales: Sale[];
}
