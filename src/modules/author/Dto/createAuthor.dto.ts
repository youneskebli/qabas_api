import {IsNotEmpty, IsOptional, IsString, MaxLength} from "class-validator";

export class CreateAuthorDto {
    @IsString({message:'Name should be a string'})
    @IsNotEmpty({message:'Name should not be empty'})
    @MaxLength(100,{message:'Name should not exceed 100 characters'})
    name:string

    @IsOptional()
    @IsString({message:'image should be a string'})
    image?:string

    @IsString({message:'author Info should be a string'})
    @IsNotEmpty({message:'author Info should not be empty'})
    authorInfo:string

    @IsString({message:'about Author should be a string'})
    @IsNotEmpty({message:'about Author should not be empty'})
    aboutAuthor:string
}