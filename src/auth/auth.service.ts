import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}

    async signIn(username: string, pass: string): Promise<{access_token: string} | HttpException> {
        const user = await this.userService.getUserByUsername(username);

        if(user instanceof User){
            if (user?.password !== pass) {
                throw new UnauthorizedException();
              }

            const payload = { sub: user.id, username: user.username}
            
            return {
                access_token: await this.jwtService.signAsync(payload),
            }
        }
        throw user;
    }

    async signUp(signUpDto: SignUpDto){
        const hashedPassword = await this.encodePassword(signUpDto.password);
        signUpDto.password = hashedPassword;
        return this.userService.createUser(signUpDto);
    }

    async encodePassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }
}
