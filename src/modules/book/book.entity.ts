    import {BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
    import {Quote} from "../quote/quote.entity";
    import {Author} from "../author/author.entity";
    import {CreateDateColumn} from "typeorm";
    import {Category} from "../category/category.entity";
    import {BookLanguageEnum} from "../../commons/enums/language.enum";
    import {SubCategory} from "../sub-category/subCategory.entity";
    
    @Entity('books')
    export class Book extends BaseEntity {
        @PrimaryGeneratedColumn()
        id: number
    
        @Column({length: 255})
        title: string
    
        @Column({nullable:true})
        cover: string
    
        @Column({type: "text"})
        introduction: string
    
        @Column({nullable:true})
        review: string
    
        @Column()
        bookSize: number
    
        @Column({
            type:'enum',
            enum:BookLanguageEnum,
            array:false
        })
        language: BookLanguageEnum
    
        @Column(
            {default:0}
        )
        readCount: number
    
        @Column({nullable:true})
        epubFilePath: string; // Path to the .epub file
    
        @Column({length: 255})
        publisher: string
    
        @Column()
        yearOfPublication: number
    
        @CreateDateColumn({type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
        createdAt: Date
    
    
        @OneToMany(() => Quote, quote => quote.book)
        quotes: Quote[]
    
        @ManyToOne(() => Author, author => author.books)
        author: Author
    
        @ManyToMany(()=>Category,category=>category.books)
        @JoinTable()
        categories:Category[]
    
        @ManyToMany(()=>SubCategory,subCategory=>subCategory.books)
        @JoinTable()
        subCategories:SubCategory[]
    }