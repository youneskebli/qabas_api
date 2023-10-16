import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Book} from "../book/book.entity";
import {Author} from "../author/author.entity";

@Entity('quotes')
export class Quote extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:"text"})
    text:string

    @ManyToOne(()=>Book,book=>book.quotes)
    book:Book

    @ManyToOne(()=>Author,author=>author.quotes)
    author:Author
}
