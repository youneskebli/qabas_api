import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Quote} from "./quote.entity";
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import {User} from "../auth/entities/user.entity";
import {AuthorService} from "../author/author.service";
import {BookService} from "../book/book.service";
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


    async getUserQuotes(user:User):Promise<Quote[]> {
          // return  await this.quoteRepository.find({where:{userId:user.id})
          const userId=user.id
          const quotes = await this.quoteRepository.createQueryBuilder('quote')
              .leftJoinAndSelect('quote.user','user')
              .where('user.id =:userId',{userId})
              .getMany()
          if (!quotes || quotes.length ===0 ){
            throw new NotFoundException('No quotes found for the specified author')
          }
          return quotes
    }

    async getAuthorQuotes(authorId:number):Promise<Quote[]> {
        // const author = await this.authorService.getAuthorById(authorId)
        // return await this.quoteRepository.find({where:{authorId:author.id}})
        const quotes = await this.quoteRepository.createQueryBuilder('quote')
        .leftJoinAndSelect('quote.author','author')
        .where('author.id =:authorId', {authorId})
        .getMany()

        if (!quotes || quotes.length ===0 ){
            throw new NotFoundException('No quotes found for the specified author')
        }
        return quotes
    }

    async  getBookQuotes(bookId:number):Promise<Quote[]>{
        // const book = await this.bookService.getBookById(bookId)
        // return this.quoteRepository.find({where:{bookId:book.id}})
        const quotes = await this.quoteRepository.createQueryBuilder('quote')
            .leftJoinAndSelect('quote.book','book')
            .where('book.id =:bookId ',{bookId})
            .getMany()
        if (!quotes || quotes.length===0){
            throw new NotFoundException('No quotes found for the specified book')
        }
        return quotes
    }

    async getOneQuote(id:number):Promise<Quote> {
        const quote= await this.quoteRepository.findOne({where:{id}})
        if (!quote){
            throw new NotFoundException(`quote with this id :${id} does not exist`)
        }
        return quote
    }

    async createQuote(user:User,bookId:number,createQuoteDto:CreateQuoteDto){
        const book= await this.bookService.getBookById(bookId)
        const author = await this.authorService.getAuthorById(book?.author?.id)
        const quote =  this.quoteRepository.create(createQuoteDto)
        quote.author=author
        quote.book=book
        quote.user=user
        return await quote.save()
    }

    async updateQuote(user:User,id:number,updateQuoteDto:UpdateQuoteDto):Promise<UpdateResult> {

        const quote = await this.getOneQuote(id)
        if (!quote){
            throw new NotFoundException(`quote with id = ${id} does not exist`)
        }

        if (user.id !== quote.user.id) {
            throw new UnauthorizedException('you are not authorized...')
        }

        return await this.quoteRepository.update(id, updateQuoteDto)

    }

    async deleteQuote(user:User,id:number):Promise<DeleteResult> {
        const quote = await this.getOneQuote(id)
        if (!quote){
            throw new NotFoundException(`quote with id = ${id} does not exist`)
        }

        if (user.id !== quote.user.id) {
            throw new UnauthorizedException('you are not authorized...')
        }

        return await this.quoteRepository.delete(id)
    }
}
