import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Book} from "../book/book.entity";
import {Quote} from "../quote/quote.entity";

@Entity('authors')
export  class Author extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column({length:100})
    name:string

    @Column({nullable:true})
    image:string

    @Column({type:"text"})
    authorInfo:string

    @Column({type:"text"})
    aboutAuthor:string

    @OneToMany(()=>Book,book=>book.author,{eager:true})
    books:Book[]

    @OneToMany(()=> Quote,quote=>quote.author,{
        eager:true
    })
    quotes:Quote[]

}