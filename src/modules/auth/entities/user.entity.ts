// @ts-ignore

import {BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique} from "typeorm";
import * as bcrypt from "bcrypt";
import {Profile} from "../../profile/entities/profile.entity";
import {Role} from "../../../commons/enums/role.enum";
import {Quote} from "../../quote/quote.entity";
@Entity('users')
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({
        nullable: true,
    })
    password: string;

    @Column()
    email: string;

    @Column({
        nullable: true,
    })
    salt: string;

    @Column({
        type: 'enum',
        enum: Role,
        array: true,
    })
    roles: Role[];



    @Column({
        default: false,
    })
    isEmailVerified: boolean;

    @Column({nullable:true})
    otp:number

    @OneToOne(() => Profile, profile => profile.user,{eager:true,onDelete:"CASCADE",cascade:true})
    @JoinColumn()
    profile: Profile;

    @OneToMany(()=>Quote,quote=>quote.user,{eager:true,onDelete:"CASCADE",cascade:true})
    quotes:Quote[]


    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}