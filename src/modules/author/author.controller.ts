import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import {AuthorService} from "./author.service";
import {CreateAuthorDto} from "./Dto/createAuthor.dto";
import {UpdateAuthorDto} from "./Dto/updateAuthor.dto";

@Controller('author')
export class AuthorController {
    constructor(private authorService:AuthorService) {
    }

    @Get()
    getAllAuthors(){
        return this.authorService.getAllAuthors()
    }

    @Get('limit/:limit')
    getLimitedAuthors(@Param('limit',ParseIntPipe) limit:number){
        return this.authorService.getLimitedAuthors(limit)
    }

    @Get(':id')
    getAuthorById(@Param('id',ParseIntPipe) id:number){
        return this.authorService.getAuthorById(id)
    }

    @Post()
    createAuthor(@Body() createAuthorDto:CreateAuthorDto) {
        return this.authorService.createAuthor(createAuthorDto)
    }

    @Put(':id')
    updateAuthor(@Param('id',ParseIntPipe) id:number,@Body() updateAuthorDto:UpdateAuthorDto){
        return this.authorService.updateAuthor(id,updateAuthorDto)
    }

    @Delete(':id')
    deleteAuthor(@Param('id',ParseIntPipe) id:number) {
        return this.authorService.deleteAuhtor(id)
    }
}
