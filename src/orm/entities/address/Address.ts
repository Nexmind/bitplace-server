import { Entity, Unique, Column, ManyToOne } from "typeorm";
import { EntityBase } from "../BaseEntity";
import { City } from "./City";

@Entity()
export class Address extends EntityBase {
    @Column({ nullable: true })
    street: string

    @Column({ nullable: true })
    number: string

    @Column({ type: 'float'})
    lat: number

    @Column({ type: 'float'})
    long: number  

    @ManyToOne(type => City)
    city: City
}