import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Quote} from "./quote.entity";
import {AuthorModule} from "../author/author.module";
import {BookModule} from "../book/book.module";
import {PassportModule} from "@nestjs/passport";
import {AuthConstants} from "../../commons/constants/auth-constants";
import {QuoteController} from "./quote.controller";

@Module({
  imports:[TypeOrmModule.forFeature(
      [Quote]
  ),
      AuthorModule,
      BookModule,
      PassportModule.register({
          defaultStrategy: AuthConstants.strategy})
  ],
  controllers:[QuoteController],
  providers: [QuoteService]
})
export class QuoteModule {}
