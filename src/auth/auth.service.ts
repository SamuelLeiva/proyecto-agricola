import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}

    async signIn(signInDto: SignInDto): Promise<{access_token: string} | HttpException> {
        const user = await this.userService.getUserByEmail(signInDto.email);

        if(user instanceof User){
            const checkedPassword = await this.checkPassword(signInDto.password, user.password);
            if (!checkedPassword) {
                throw new UnauthorizedException("Bad credentials");
            }
            const payload = { sub: user.id, name: user.name}
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

    async checkPassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}
