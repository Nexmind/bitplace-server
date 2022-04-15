import { Entity, Unique, Column, ManyToOne } from "typeorm"
import { EntityBase } from "../BaseEntity"
import { Country } from "./Country"

@Entity()
export class AdministrationArea extends EntityBase {
    @Column({ nullable: true })
    name: string

    @Column({ nullable: false })
    code: string

    @ManyToOne(type => Country)
    country: Country
}