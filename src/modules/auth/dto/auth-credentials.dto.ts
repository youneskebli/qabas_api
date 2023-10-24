import {isEmail, IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength} from "class-validator";
import {Unique} from "typeorm";

export class AuthCredentialsDto {
    @IsNotEmpty()
    username:string;
    @IsEmail()
    email:string;
    @MinLength(8,{message:"the password must be at least contains 8 character"})
    @IsStrongPassword()
    password:string
}