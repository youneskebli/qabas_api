/* eslint-disable prettier/prettier */
import { DataSource, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { Role } from "src/commons/enums/role.enum";
import { EmailUserNameLoginDto} from "../dto/emailLogin.dto";
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

    async validateUserPassword(emailUserNameloginDto:EmailUserNameLoginDto){
        const {emailOrUserName,password}= emailUserNameloginDto
        const user= await this.findByEmail(emailOrUserName);
        if (!user){
            const user = await this.findByUsername(emailOrUserName)
            if (!user){
                throw new NotFoundException('user does not exist')
            }
            if(  await user?.validatePassword(password)){
                return {
                    user,
                    emailOrUserName
                }
            }
            else{
                throw new BadRequestException('password incorrect');
            }
        }
        if(  await user?.validatePassword(password)){
            return {
                user,
                emailOrUserName
            }
        }
        else{
            throw new BadRequestException('password incorrect');
        }
    }

    async validateAdminPassword(emailUserNameLoginDto:EmailUserNameLoginDto){
        const {emailOrUserName,password}= emailUserNameLoginDto;
        const user= await this.findByEmail(emailOrUserName);
        if (!user){
            const user = await this.findByUsername(emailOrUserName)
            if (!user){
                throw new NotFoundException('user does not exist');
            }
        }
        const isAdmin= ():boolean => user.roles.some(role => role === Role.ADMIN)
        if(!isAdmin){
            throw new ForbiddenException('the user does not an admin')
        }

        if(user && await user.validatePassword(password)){
            return {
                user,
                emailOrUserName
            }
        }

        else{
            throw new BadRequestException('password incorrect');
        }
    }

    async hashPassword(password,salt:string):Promise<string> {
        return await bcrypt.hash(password,salt);
    }


}
