import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Book} from "./book.entity";
import {BookController} from "./book.controller";
import {BookService} from "./book.service";
import {AuthorModule} from "../author/author.module";
import {CategoryModule} from "../category/category.module";
import {SubCategoryModule} from "../sub-category/sub-category.module";

@Module({
    imports:[TypeOrmModule.forFeature([Book]),AuthorModule,CategoryModule,forwardRef(()=>SubCategoryModule)],
    controllers:[BookController],
    providers:[BookService],
    exports:[BookService]
})
export class BookModule {}
