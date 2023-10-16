import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from '@nestjs/common';
import {BookService} from "./book.service";

@Controller('book')
export class BookController {
    constructor(private bookService:BookService) {
    }

    @Get()
    getAllBooks(){
        return this.bookService.getAllBooks()
    }

    @Get('category/:categoryId')
    findBooksByCategory(@Param('categoryId',ParseIntPipe) categoryId:number){
        return this.bookService.findBooksByCategory(categoryId)
    }

    @Get('author/:authorId')
    findBooksByAuthor(@Param('authorId',ParseIntPipe) authorId:number){
        return this.bookService.findBooksByAuthor(authorId)
    }

    @Get('publisher')
    findBooksByPublisher(@Query('publisher') publisher:string){
        return this.bookService.findBooksByPublisher(publisher)
    }

    @Get('newest')
    findBooksByNewest(@Query('limit',ParseIntPipe) limit:number){
        return this.bookService.findBooksByNewest(limit)
    }

    // @Get('most-read')
    // getBookMostRead(){
    //     return this.bookService.
    // }

    @Get(':id')
    getOneBook(@Param('id',ParseIntPipe) id:number){
        return this.bookService.getBookById(id)
    }

    @Post(':authorId/')
    CreateBook(@Param('authorId',ParseIntPipe) authorId:number,@Body() createBookDto:any) {
        return this.bookService.createBook(authorId,createBookDto)
    }

    @Put(':id/updateBook')
    updateBook(@Param('id',ParseIntPipe) id:number, @Body() updateBookDto:any) {
        return  this.bookService.updateBook(id,updateBookDto)
    }

    @Delete(':id')
    deleteBook(@Param('id',ParseIntPipe) id:number) {
        return this.bookService.deleteBook(id)
    }
}
