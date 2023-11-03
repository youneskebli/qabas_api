/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Profile } from "./entities/profile.entity";
import { Repository } from "typeorm";
import { User } from "../auth/entities/user.entity";
import {CreateProfileDto} from "../auth/dto/createProfile.dto";

@Injectable()
export class ProfileService {
    constructor(@InjectRepository(Profile) private profileRepo:Repository<Profile>,

    ) {}
    
    async getProfileData(user:User):Promise<Profile> {
        const profile = await this.profileRepo.findOne({where:{id:user?.profile?.id}})

        if (!profile) {
            throw new NotFoundException('profile does not found');
        }

        return profile;

    }

    async editProfile(user:User,createProfileDto:CreateProfileDto):Promise<Profile> {
        const profile= await this.getProfileData(user);
        const { firstname, lastname, phone, age, address, city, country, gender }
      = createProfileDto;

      if (firstname) {
        profile.firstName=firstname
      }

      if (lastname) {
        profile.lastName=lastname
      }

      if (phone) {
        profile.phone=phone
      }

      if (age) {
        profile.age=age
      }

      if (address) {
        profile.address=address
      }

      if (city) {
        profile.city=city
      }

      if (country) {
        profile.country=country
      }

      if (gender) {
        profile.gender=gender
      }

      const savedProfile= await profile.save();
      return savedProfile;
    }

    async setProfileImage(user:User,image:any) {
        const profile=await this.getProfileData(user);
        if (image) {
            // profile.image= await this.awsService.fileUpload(image,'profile-images')
        }
        const savedProfile:Profile= await profile.save()
        return savedProfile;
    }

    async changeProfileImage(user:User,image:any):Promise<Profile>{
        const profile=await this.getProfileData(user);
        if (image) {
        //     await this.awsService.fileDelete(profile.image);
        //     profile.image= await this.awsService.fileUpload(image,'profile-images')
         }
        const savedProfile :Profile= await profile.save();
        return savedProfile;
    }

    async deleteProfileImage(user:User):Promise<Profile> {
        const profile=await this.getProfileData(user)
        if (!profile.image) {
            throw new ConflictException('the profile image  is already set to null!');
        }
        // await this.awsService.fileDelete(profile.image)
        // profile.image=null;
        const savedProfile=await profile.save();
        return savedProfile;
    }

    async deleteProfile(id:number){
      const result= await this.profileRepo.delete(id)
      if (result.affected === 0) {
        throw new NotFoundException('profile does not exist')
      }
    }

}