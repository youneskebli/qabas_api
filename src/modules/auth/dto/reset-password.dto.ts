import {IsEmail, IsNotEmpty, IsString, IsStrongPassword} from "class-validator";

export class ResetPasswordDto {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
    @IsNotEmpty()
    @IsStrongPassword()
    readonly newPassword: string;
    @IsString()
    readonly newPasswordToken: string;
    @IsNotEmpty()
    readonly currentPassword: string;
    @IsNotEmpty()
    @IsStrongPassword()
    readonly confirmPassword: string;
}