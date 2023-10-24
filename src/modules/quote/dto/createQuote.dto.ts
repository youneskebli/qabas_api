import {IsNotEmpty, IsString } from "class-validator";

export class CreateQuoteDto {
    @IsString()
    @IsNotEmpty()
    text:string
}