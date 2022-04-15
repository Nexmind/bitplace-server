import { Entity, Unique, Column, ManyToOne } from "typeorm";
import { EntityBase } from "../BaseEntity";
import { AdministrationArea } from "./AdministrationArea";

@Entity()
export class City extends EntityBase {
    @Column({ nullable: true })
    name: string

    @Column({ nullable: false })
    zipCode: string

    @ManyToOne(type => AdministrationArea)
    administrationArea: AdministrationArea
}