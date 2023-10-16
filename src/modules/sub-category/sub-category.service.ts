import {forwardRef, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Repository} from "typeorm";
import {SubCategory} from "./subCategory.entity";
import {BookService} from "../book/book.service";
import {CategoryService} from "../category/category.service";

@Injectable()
export class SubCategoryService {
    constructor(@InjectRepository(SubCategory) private subCategoryRepository:Repository<SubCategory>,
                                               private categoryService:CategoryService,
                                               @Inject(forwardRef(()=>BookService)) private bookService:BookService
    ) {
    }

    async getAllSubCategories():Promise<SubCategory[]> {
        return await this.subCategoryRepository.find()
    }

    async getOneSubCategory(id:number):Promise<SubCategory>{
        return await this.subCategoryRepository.findOne({where:{id},relations:['category']})
    }

    async findSubcategoriesByCategoryId(categoryId: number): Promise<SubCategory[]> {
        const subCategories = await this.subCategoryRepository
            .createQueryBuilder('subCategory')
            .leftJoinAndSelect('subCategory.category','category')
            .where('subCategory.categoryId =:id',{id:categoryId})
            .getMany()
        if (!subCategories) {
            throw new NotFoundException('Category not found');
        }
        return  subCategories
    }



    async createSubCategory(categoryId:number,name:string):Promise<SubCategory> {
        const category = await this.categoryService.getOneCategory(categoryId)
        const subCategory = new SubCategory()
        subCategory.name= name
        subCategory.category=category
        return await subCategory.save()
    }

    // async assignBookToSubCategory(bookId:number,subCategoryId:number):Promise<any> {
    //     const book = await this.bookService.getBookById(bookId)
    //     const subCategory = await this.getOneSubCategory(subCategoryId)
    //     if (!subCategory.books){
    //         subCategory.books = []
    //     }
    //     subCategory.books.push(book)
    //     return await subCategory.save()
    // }

    async updateSubCategory(id:number,name?:string):Promise<SubCategory>{
        const subCategory = await this.getOneSubCategory(id)
        if (name) {
            subCategory.name = name
        }
        return await subCategory.save()
    }

    async deleteSubCategory(id:number):Promise<DeleteResult> {
        const deleteResult =  await this.subCategoryRepository.delete(id)
        if (deleteResult.affected === 0) {
            throw new NotFoundException(`category with id : ${id} does not exist`)
        }
        return deleteResult;
    }
}
