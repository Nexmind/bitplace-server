import { Column, Entity, Unique } from "typeorm"
import { EntityBase } from "../BaseEntity"

@Entity()
export class Country extends EntityBase {
    @Column({ nullable: false })
    code: string
}