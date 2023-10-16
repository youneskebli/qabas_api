import {BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {SubCategory} from "../sub-category/subCategory.entity";
import {Book} from "../book/book.entity";

@Entity('categories')
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @OneToMany(()=>SubCategory,subCategory=>subCategory.category,{eager:true,cascade:true,onDelete:'CASCADE'})
    subCategories:SubCategory[]

    @ManyToMany(()=>Book,book=>book.categories)
    books:Book[]
}