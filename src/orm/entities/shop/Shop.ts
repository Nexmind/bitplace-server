import bcrypt from 'bcryptjs';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Address } from '../address/Address';
import { EntityBase } from '../BaseEntity';
import { User } from '../user/User';

@Entity()
export class Shop extends EntityBase {

    @Column()
    name: string

    @Column({ type: 'text' })
    description: string

    @ManyToOne(type => Address)
    address: Address

    @ManyToOne(type => User)
    user: User

    @Column({ nullable: true })
    website: string

    @Column({ nullable: true })
    email: string

    @Column({ nullable: true })
    phone: string

}
