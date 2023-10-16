import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import {CategoryService} from "./category.service";
import {CreateCategoryDto} from "./Dto/createCategory.dto";

@Controller('category')
export class CategoryController {
    constructor(private categoryService:CategoryService) {
    }

    @Get()
    getAllCategories(){
        return this.categoryService.getAllCategories()
    }

    @Get(':id')
    getCategoryById(@Param('id',ParseIntPipe) id:number){
        return this.categoryService.getOneCategory(id)
    }



    @Post()
    createCategory(@Body() createCategoryDto:CreateCategoryDto) {
        return this.categoryService.createCategory(createCategoryDto)
    }

    @Put(':id')
    updateCategory(@Param('id',ParseIntPipe) id:number,@Body('name') name:string) {
        return this.categoryService.updateCategory(id,name)
    }

    @Delete(':id')
    deleteCategory(@Param('id',ParseIntPipe) id:number) {
        return this.categoryService.deleteCategory(id)
    }
}
