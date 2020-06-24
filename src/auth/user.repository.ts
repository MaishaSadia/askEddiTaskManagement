import { User } from "./user.entity";
import { Repository, EntityRepository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { InternalServerErrorException, ConflictException } from "@nestjs/common";


@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
        const { username, password } = authCredentialsDto;

        //console.log(salt);

        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

       // console.log(user.password);
        try{
            await user.save();
        }
        catch(error){
            //console.log(error.code);
            if(error.code === '23505'){ //duplicate username
                throw new ConflictException('Username alreay exists');
            }
            else{
                throw new InternalServerErrorException();
            }
        }
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string>{
        const { username, password } = authCredentialsDto;
        const user = await this.findOne({ username });

        if(user && await user.validatePassword(password)){
            return user.username;
        } 
        else{
            return null;
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string>{
        return bcrypt.hash(password, salt);
    }
}