import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Category} from "./category.entity";
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import {SubCategory} from "../sub-category/subCategory.entity";
import {CreateCategoryDto} from "./Dto/createCategory.dto";
import {SubCategoryService} from "../sub-category/sub-category.service";

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category) private categoryRepository:Repository<Category>
                                            ) {
    }

    async getAllCategories():Promise<Category[]> {
        return await this.categoryRepository.find()
    }

    async getOneCategory(id:number):Promise<Category>{
        return await this.categoryRepository.findOne({where:{id}})
    }



    async createCategory(createCategoryDto:CreateCategoryDto):Promise<Category> {
        const {name}= {...createCategoryDto}
        const category = new Category()
        category.name= name
        return await category.save()
    }

    async updateCategory(id:number,name?:string):Promise<Category>{
        const category = await this.getOneCategory(id)
        if (name) {
            category.name = name
        }
        return await category.save()
    }

    async deleteCategory(id:number):Promise<DeleteResult> {
        const deleteResult =  await this.categoryRepository.delete(id)
        if (deleteResult.affected === 0) {
            throw new NotFoundException(`category with id : ${id} does not exist`)
        }
        return deleteResult;
    }
}
