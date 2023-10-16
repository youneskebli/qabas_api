import {forwardRef, Module} from '@nestjs/common';
import { SubCategoryController } from './sub-category.controller';
import {CategoryModule} from "../category/category.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SubCategory} from "./subCategory.entity";
import {SubCategoryService} from "./sub-category.service";
import {BookModule} from "../book/book.module";

@Module({
  imports:[TypeOrmModule.forFeature([SubCategory]),forwardRef(()=>BookModule),CategoryModule],
  controllers: [SubCategoryController],
  providers:[SubCategoryService],
  exports:[SubCategoryService]
})
export class SubCategoryModule {}
