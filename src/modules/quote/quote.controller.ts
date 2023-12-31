import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards} from '@nestjs/common';
import {CreateQuoteDto} from "./dto/createQuote.dto";
import {GetAuthenticatedUser} from "../../commons/decorators/authenticated-user.decorator";
import {User} from "../auth/entities/user.entity";
import {QuoteService} from "./quote.service";
import {UpdateQuoteDto} from "./dto/updateQuote.dto";
import {AcceptedAuthGuard} from "../../commons/guards/accepted-auth.guard";
import {Roles} from "../../commons/decorators/roles.decorator";
import {Role} from "../../commons/enums/role.enum";
import {AuthGuard} from "@nestjs/passport";

@UseGuards(AuthGuard(),AcceptedAuthGuard)
@Roles([Role.USER,Role.ADMIN])
@Controller('quote')
export class QuoteController {
    constructor(private quoteService:QuoteService) {
    }



    @Get('user')
    getUserQuotes(@GetAuthenticatedUser() user:User){
        return this.quoteService.getUserQuotes(user)
    }

    @Get('author/:authorId')
    GetAuthorQuotes(@Param('authorId',ParseIntPipe) authorId:number){
        return this.quoteService.getAuthorQuotes(authorId)
    }

    @Get('book/:bookId')
    GetBookQuotes(@Param('bookId',ParseIntPipe) bookId:number){
        return this.quoteService.getBookQuotes(bookId)
    }

    @Get(':id')
    getOneQuote(@Param('id',ParseIntPipe) id:number){
        return this.quoteService.getOneQuote(id)
    }

    @Post('create/:bookId')
    createQuote(@GetAuthenticatedUser() user:User,@Param('bookId',ParseIntPipe) bookId:number,@Body() createQuoteDto:CreateQuoteDto) {
        return this.quoteService.createQuote(user,bookId,createQuoteDto)
    }

    @Put('update/:id')
    updateQuote(@GetAuthenticatedUser() user:User,@Param('id',ParseIntPipe) id:number,@Body() updateQuoteDto:UpdateQuoteDto){
        return this.quoteService.updateQuote(user,id,updateQuoteDto)
    }

    @Delete('delete/:id')
    deleteQuote(@GetAuthenticatedUser() user:User,@Param('id',ParseIntPipe) id:number) {
        return this.quoteService.deleteQuote(user,id)
    }

}
