import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Book} from "../book/book.entity";
import {Author} from "../author/author.entity";
import {User} from "../auth/entities/user.entity";

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

    @ManyToOne(()=>User,user=>user.quotes)
    user:User

    // foreign key
    @Column({nullable:true})
    userId:number

    // foreign key
    @Column({nullable:true})
    authorId:number

    // foreign key
    @Column({nullable:true})
    bookId:number
}
