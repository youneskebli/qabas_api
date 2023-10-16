import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule, TypeOrmModuleOptions} from "@nestjs/typeorm";
import {config} from "../config";
import {BookModule} from "./modules/book/book.module";
import {AuthorModule} from "./modules/author/author.module";
import {QuoteModule} from "./modules/quote/quote.module";
import {CategoryModule} from "./modules/category/category.module";
import {SubCategoryModule} from "./modules/sub-category/sub-category.module";


@Module({
  imports: [TypeOrmModule.forRoot(config.db as TypeOrmModuleOptions),
            BookModule,
            AuthorModule,
            QuoteModule,
            SubCategoryModule,
            CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
