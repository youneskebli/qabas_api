/* eslint-disable prettier/prettier */
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('verify-emails')
@Unique(['email','emailToken'])
export class EmailVerification extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;

    @Column()
    emailToken:string;

    @Column()
    timeStamp:Date;



}