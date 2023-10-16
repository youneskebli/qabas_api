import {BaseEntity, Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn, ManyToMany} from "typeorm";
import {Category} from "../category/category.entity";
import {Book} from "../book/book.entity";

@Entity('subCategories')
export class SubCategory extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @ManyToOne(()=>Category,category=>category.subCategories)
    category:Category

    @ManyToMany(()=>Book,book=>book.subCategories)
    books:Book[]

}