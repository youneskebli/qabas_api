import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Author} from "./author.entity";
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import {CreateAuthorDto} from "./Dto/createAuthor.dto";
import {UpdateAuthorDto} from "./Dto/updateAuthor.dto";
import {OmitType} from "@nestjs/mapped-types";

@Injectable()
export class AuthorService {
    constructor(@InjectRepository(Author) private authorRepository:Repository<Author>) {
    }

    async getAllAuthors():Promise<Author[]> {
        return await this.authorRepository.find()
    }

    async getLimitedAuthors(limit:number):Promise<Author[]> {
        return await this.authorRepository.find({take:limit})
    }

    async getAuthorById(id:number):Promise<Author> {
        const author = await this.authorRepository.findOne({where:{id}})
        if (!author) {
            throw new NotFoundException(`Author with this id : ${id} does not exist`)
        }
        return author
    }

    async createAuthor(createAuthorDto:CreateAuthorDto):Promise<Author>{
        const author = this.authorRepository.create({...createAuthorDto})
        return await author.save()
    }

    async updateAuthor(id:number,updateAuthorDto:UpdateAuthorDto):Promise<UpdateResult> {
        const author = await this.getAuthorById(id)
        // updateAuthorDto['id'] = id
        //
        // if (JSON.stringify(updateAuthorDto) == JSON.stringify(author)) {
        //     return
        // }
        return  await this.authorRepository.update(id,updateAuthorDto)
    }

    async deleteAuhtor(id:number):Promise<DeleteResult> {
        const author= await this.getAuthorById(id)
        return await this.authorRepository.delete(id)
    }
}
