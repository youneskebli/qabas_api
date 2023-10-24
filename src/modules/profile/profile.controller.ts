/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Patch, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { GetAuthenticatedUser } from "src/commons/decorators/authenticated-user.decorator";
import { User } from "../auth/entities/user.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { ProfileService } from "./profile.service";
import { AuthGuard } from "@nestjs/passport";
import { AcceptedAuthGuard } from "src/commons/guards/accepted-auth.guard";
import { Roles } from "src/commons/decorators/roles.decorator";
import { Role } from "src/commons/enums/role.enum";
import {CreateProfileDto} from "../auth/dto/createProfile.dto";

@UseGuards(AuthGuard(), AcceptedAuthGuard)
@Roles([Role.ADMIN, Role.USER])
@Controller('profiles')
export class ProfileController {
    constructor(private profileService:ProfileService){}

    @Get('user-profile')
    getUserProfile(@GetAuthenticatedUser() user:User) {
      return this.profileService.getProfileData(user);
    }

    @Post('user-profile/set-profile-image')
    @UseInterceptors(FileInterceptor('image'))
    setProfileImage(@UploadedFile() Image:any,@GetAuthenticatedUser() user:User) {
      return this.profileService.setProfileImage(user,Image);
    }

    @Patch('user-profile/change-profile-image')
    @UseInterceptors(FileInterceptor('image'))
    changeProfileImage(@GetAuthenticatedUser() user:User,@UploadedFile() image:any) {
      return this.profileService.changeProfileImage(user,image);
    }

    @Put('user-profile/edit-profile')
    editProfile(@GetAuthenticatedUser() user:User,@Body() createProfileDto:CreateProfileDto ) {
      return this.profileService.editProfile(user,createProfileDto)
    }
    
    @Delete('user-profile/delete-profile-image')
    deleteProfileImage(@GetAuthenticatedUser() user:User) {
      return this.profileService.deleteProfileImage(user)
    }
    
}