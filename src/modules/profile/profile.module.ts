/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { Profile } from './entities/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthConstants } from 'src/commons/constants/auth-constants';
import { PassportModule } from '@nestjs/passport';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
     imports: [TypeOrmModule.forFeature([Profile]), PassportModule.register({
          defaultStrategy: AuthConstants.strategy,
        }),
     ],
     controllers:[ProfileController],
     providers:[ProfileService],
     exports:[ProfileService]
})
export class ProfileModule {

}
