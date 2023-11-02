/* eslint-disable prettier/prettier */
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from 'src/commons/enums/gender.enum';
import { User } from 'src/modules/auth/entities/user.entity';

@Entity('profiles')
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true})
  firstName: string;

  @Column({nullable:true})
  lastName: string;

  @Column({
    nullable:true
  })
  gender: Gender;

  @Column({
    nullable:true
  })
  age: number;

  @Column({
    nullable:true
  })
  country: string;

  @Column({
    nullable:true
  })
  city: string;

  @Column({
    nullable:true
  })
  address: string;

  @Column({
    nullable:true
  })
  phone: string;

  @Column({
    nullable: true
  })
  image: string;


  @OneToOne(() => User, user => user.profile, {
    eager: false
  })
  user: User;



}