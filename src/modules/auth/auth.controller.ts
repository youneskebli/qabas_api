/* eslint-disable prettier/prettier */
import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards} from "@nestjs/common";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { AuthService } from "./auth.service";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { AuthGuard } from "@nestjs/passport";
import { UserAuthGuard } from "src/commons/guards/user-auth.guard";
import { Role } from "src/commons/enums/role.enum";
import { Roles } from "src/commons/decorators/roles.decorator";
import { GetAuthenticatedUser } from "src/commons/decorators/authenticated-user.decorator";
import { User } from "./entities/user.entity";
import { AdminAuthGuard } from "src/commons/guards/admin-auth.guard";
import {CreateProfileDto} from "./dto/createProfile.dto";
import {EmailUserNameLoginDto} from "./dto/emailLogin.dto";
import {UserRepository} from "./repository/user.repository";

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService,
                private userRepository:UserRepository
                ) {}

    @Post('register/user')
    signup(
        @Body('authCredentialsDto') authCredentialsDto:AuthCredentialsDto
    ){
      return this.authService.signUp(authCredentialsDto);
    }

    @Post('login/user')
    SignInUser(@Body('emailUserNameLoginDto') emailUserNameLoginDto:EmailUserNameLoginDto) {
      return this.authService.signInUser(emailUserNameLoginDto);
    }

    @Get('email/send-email-verification/:email')
    async sendEmailVerification(@Param('email') email: string) {
        const user = await this.userRepository.findByEmail(email)
        if (!user){
            throw new NotFoundException('user does not exist')
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        user.otp=otp
        await this.authService.createEmailToken(email);
        return this.authService.sendEmailVerification(email,otp);
    }
  
    @Get('email/verify/:token/:otp')
    verifyEmail(@Param('token') token: string,@Param('otp') otp:number) {
      return this.authService.verifyEmail(token,otp);
    }

    @Get('email/forgot-password/:email')
    sendEmailForgotPassword(@Param('email') email: string) {
      return this.authService.sendEmailForgottenPassword(email);
    }
  
    @Post('email/reset-password/:otp')
    setNewPassword(@Body() resetPasswordDto: ResetPasswordDto,@Param('otp') otp:number) {
      return this.authService.setNewPassword(resetPasswordDto,otp);
    }

    
    @Get('user-main-data')
    @UseGuards(AuthGuard(),UserAuthGuard)
    @Roles([Role.USER])
    getUserData(@GetAuthenticatedUser() user:User){
       return this.authService.getUserMainData(user);
    }



    @Get('check-username/:username')
    isNotValidUsername(@Param('username') username: string) {
      return this.authService.isNotValidUsername(username);
    }

    @Post('login/admin')
    SignInAdmin(@Body('emailUserNameLoginDto') emailUserNameLoginDto:EmailUserNameLoginDto) {
      return this.authService.signInAdmin(emailUserNameLoginDto);
    }

  @Get('system-users')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  getSystemUsers() {
    return this.authService.getSystemUsers();
  }

  @Get('users/:id')
  getUserById(@Param('id') id: number) {
    return this.authService.getUserById(id);
  }

  @Put('edit-user-roles/:userId')
  @UseGuards(AuthGuard(), AdminAuthGuard)
  @Roles([Role.ADMIN])
  editUserRoles(@Param('userId') userId: number, @Body() roles: Role[]) {
    return this.authService.editUserRoles(userId, roles);
  }
    
    
}