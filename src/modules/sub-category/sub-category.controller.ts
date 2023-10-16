import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import {SubCategoryService} from "./sub-category.service";

@Controller('sub-category')
export class SubCategoryController {
    constructor(private subCategoryService:SubCategoryService) {
    }

    @Get()
    getAllSubCategories(){
        return this.subCategoryService.getAllSubCategories()
    }

    @Get(':id')
    getSubCategoryById(@Param('id',ParseIntPipe) id:number){
        return this.subCategoryService.getOneSubCategory(id)
    }

    @Get(':categoryId/subcategories')
    findSubcategoriesByCategoryId(@Param('categoryId',ParseIntPipe) categoryId:number){
        return this.subCategoryService.findSubcategoriesByCategoryId(categoryId)
    }

    @Post('create/:categoryId')
    createSubCategory(@Param('categoryId',ParseIntPipe) categoryId:number,@Body('name') name:string) {
        return this.subCategoryService.createSubCategory(categoryId,name)
    }

    @Put(':id')
    updateSubCategory(@Param('id',ParseIntPipe) id:number,@Body('name') name:string) {
        return this.subCategoryService.updateSubCategory(id,name)
    }

    @Delete(':id')
    deleteSubCategory(@Param('id',ParseIntPipe) id:number) {
        return this.subCategoryService.deleteSubCategory(id)
    }
}
