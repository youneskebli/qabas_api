/* eslint-disable prettier/prettier */
import { DataSource, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { Role } from "src/commons/enums/role.enum";
import { EmailLoginDto } from "../dto/emailLogin.dto";
import * as bcrypt from "bcrypt"

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource:DataSource){
        super(User,dataSource.createEntityManager())
    }
    async findByEmail(email:string):Promise<User> {
        return await this.findOne({where:{email}});
    }

    async findByUsername(username:string):Promise<User>{
        return await this.findOne({where:{username}});
    }

    async validateUserPassword(emailloginDto:EmailLoginDto){
        const {email,password}= emailloginDto;
        const user= await this.findByEmail(email);

        if(!user){
            throw new NotFoundException('user does not exist');
        }

        if(  await user.validatePassword(password)){
            return {
                user,
                email
            }
        }

        else{
            throw new BadRequestException('password inncorect');
        }
    }

    async validateAdminPassword(emailloginDto:EmailLoginDto){
        const {email,password}= emailloginDto;
        const user= await this.findByEmail(email);

        if(!user){
            throw new NotFoundException('user does not exist');
        }

        const isAdmin= ():boolean => user.roles.some(role => role === Role.ADMIN)
        if(!isAdmin){
            throw new ForbiddenException('the user does not an admin')
        }

        if(user && await user.validatePassword(password)){
            return {
                user,
                email
            }
        }

        else{
            throw new BadRequestException('password inncorect');
        }
    }

    async hashPassword(password,salt:string):Promise<string> {
        return await bcrypt.hash(password,salt);
    }


}
