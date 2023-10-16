import {ArrayMinSize, IsArray, IsEmpty, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class CreateCategoryDto {
    @IsString({message:'name should be a string'})
    @IsNotEmpty({message:'name should not be empty'})
    @MaxLength(100,{message:'name should not exceed 100 characters'})
    name:string
}