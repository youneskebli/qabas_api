import { PartialType } from "@nestjs/mapped-types";
import {CreateQuoteDto} from "./createQuote.dto";

export class UpdateQuoteDto extends PartialType(CreateQuoteDto) {
}