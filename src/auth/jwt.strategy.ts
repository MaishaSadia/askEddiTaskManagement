import {PassportStrategy} from '@nestjs/passport';
import {Strategy, ExtractJwt} from 'passport-jwt';
import { async } from 'rxjs/internal/scheduler/async';
import { validate } from 'class-validator';
import{JwtPayload} from './jwt-payload.interface'
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { UnauthorizedException } from '@nestjs/common';
import { promises } from 'dns';
import { User } from './user.entity';

export class JwtStratrgy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secretMessage',
        });
    }

        async validate(payload: JwtPayload): Promise<User>{
            const {username} = payload;
            const user = await this.userRepository.findOne({username});

            if(!user){
                throw new UnauthorizedException();
            }
            return user;
        }
}