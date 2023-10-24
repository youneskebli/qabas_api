import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Quote} from "./quote.entity";
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import {User} from "../auth/entities/user.entity";
import {AuthorService} from "../author/author.service";
import {BookService} from "../book/book.service";
import {CreateBookDto} from "../book/Dto/createBook.dto";
import {CreateQuoteDto} from "./dto/createQuote.dto";
import {UpdateQuoteDto} from "./dto/updateQuote.dto";

@Injectable()
export class QuoteService {
    constructor(
        @InjectRepository(Quote) private quoteRepository:Repository<Quote>,
                                 private authorService:AuthorService,
                                 private bookService:BookService

    ) {
    }
    async getAllQuotes():Promise<Quote[]> {
        return await this.quoteRepository.find()
    }

    async getUserQuotes(user:User):Promise<Quote[]> {
         return  await this.quoteRepository.find({where:{userId:user.id}})

    }

    async getAuthorQuotes(authorId:number):Promise<Quote[]> {
        const author = await this.authorService.getAuthorById(authorId)
        return await this.quoteRepository.find({where:{authorId:author.id}})
    }

    async  getBookQuotes(bookId:number){
        const book = await this.bookService.getBookById(bookId)
        return this.quoteRepository.find({where:{bookId:book.id}})
    }

    async getOneQuote(id:number):Promise<Quote> {
        return await this.quoteRepository.findOne({where:{id}})
    }

    async createQuote(user:User,bookId:number,createQuoteDto:CreateQuoteDto){
        const book= await this.bookService.getBookById(bookId)
        const author = await this.authorService.getAuthorById(book?.author?.id)
        const quote =  this.quoteRepository.create({...createQuoteDto})
        quote.author=author
        quote.book=book
        quote.user=user
        return await quote.save()
    }

    async updateQuote(user:User,id:number,updateQuoteDto:UpdateQuoteDto):Promise<UpdateResult> {
        const quotes = await this.getUserQuotes(user)
        const quote = await this.getOneQuote(id)
        if (quotes?.includes(quote)){
            return await this.quoteRepository.update(id,updateQuoteDto)
        }else if (!quote){
            throw new NotFoundException(`quote with this id:${id} does not exist`)
        }
        else {
            throw new UnauthorizedException('you are not authorized...')
        }
    }

    async deleteQuote(user:User,id:number):Promise<DeleteResult> {
        const quotes = await this.getUserQuotes(user)
        const quote = await this.getOneQuote(id)
        if (quotes?.includes(quote)){
            return await this.quoteRepository.delete(id)
        }else if (!quote){
            throw new NotFoundException(`quote with this id:${id} does not exist`)
        }
        else {
            throw new UnauthorizedException('you are not authorized...')
        }
    }
}
