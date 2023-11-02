import {IsEmail, IsNotEmpty} from "class-validator";

export class EmailUserNameLoginDto {
    @IsNotEmpty()
    emailOrUserName:string;

    @IsNotEmpty()
    password:string
}