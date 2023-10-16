import {
    ArrayMinSize,
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    MaxLength, Min, minLength, MinLength
} from "class-validator";
import {BookLanguageEnum} from "../../../commons/enums/language.enum";

export class CreateBookDto {
    @IsString({message:'title should be a string'})
    @IsNotEmpty({message:'title should not be empty'})
    @MaxLength(100,{message:'title should not exceed 100 characters'})
    title:string

    @IsOptional()
    @IsString({message:'cover should be a string'})
    cover:string

    @IsString({message:'introduction should be a string'})
    @IsNotEmpty({message:'introduction should not be empty'})
    introduction:string

    @IsNotEmpty({message:'BookSize should be not empty'})
    @IsNumber({},{message:'BookSize should be a number'})
    bookSize:number

    @IsEnum({BookLanguageEnum},{message:'language should be an enum'})
    @IsNotEmpty({message:'language should be not empty'})
    language:BookLanguageEnum

    @IsString({message:'publisher should be a string'})
    @IsNotEmpty({message:'publisher should not be empty'})
    publisher:string

    @IsNumber({},{message:'yearOfPublication should be a number'})
    @Min(1000,{ message: 'Year of publication must be greater than or equal to 1000'})
    @Max(new Date().getFullYear(),{message: 'Year of publication must be less than or equal to the current year' })
    yearOfPublication:number

   
     @IsArray()
     @MinLength(1)
     @ArrayMinSize(1)
     subCategories : number[]


}