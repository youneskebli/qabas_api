/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthConstants } from 'src/commons/constants/auth-constants';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EmailVerification } from './entities/email-verification.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ProfileModule } from '../profile/profile.module';
import {UserRepository} from "./repository/user.repository";
import {JwtStrategy} from "./strategies/jwt-strategy";
import {ForgottenPassword} from "./entities/forgotting-password.entity";

@Module({
    imports:[ 
        PassportModule.register({
        defaultStrategy:AuthConstants.strategy,
    }),
    JwtModule.register({
        secret:AuthConstants.secretKey,
        signOptions:{
            expiresIn:AuthConstants.expiresIn,
        },
    }),
    TypeOrmModule.forFeature([User,EmailVerification,EmailVerification,ForgottenPassword,EmailVerification]),
           ProfileModule,
           ],
    controllers:[AuthController],
    providers:[UserRepository,JwtStrategy,AuthService],
    exports:[JwtStrategy,JwtModule,PassportModule,AuthService]
})
export class AuthModule {}
