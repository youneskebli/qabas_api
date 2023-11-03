import {IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword} from "class-validator";

export class ResetPasswordDto {
    @IsOptional()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsOptional()
    @IsNotEmpty()
    @IsStrongPassword()
    readonly newPassword: string;

    @IsOptional()
    @IsString()
    readonly newPasswordToken: string;

    @IsOptional()
    @IsNotEmpty()
    readonly currentPassword: string;

    @IsOptional()
    @IsNotEmpty()
    @IsStrongPassword()
    readonly confirmPassword: string;
}