import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Quote} from "./quote.entity";

@Module({
  imports:[TypeOrmModule.forFeature(
      [Quote]
  )],
  providers: [QuoteService]
})
export class QuoteModule {}
