import {IsEnum, IsInt, IsString, Max, Min} from "class-validator";
import {Gender} from "../../../commons/enums/gender.enum";

export class CreateProfileDto {


    @IsString()
    firstname:string;
    @IsString()
    lastname:string;
    @IsInt()
    @Min(10)
    @Max(100)
    age:number;
    @IsString()
    phone:string;
    @IsString()
    address:string;
    @IsString()
    city:string;
    @IsString()
    country:string;
    @IsEnum(Gender)
    gender:Gender
}