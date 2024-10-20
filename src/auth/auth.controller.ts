import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Public } from './decorators/auth.decorators';
import { Throttle } from '@nestjs/throttler';

@Throttle({ default: { limit: 20, ttl: 60000 }})
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Public()
    @Post('login')
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto);
    }

    @Public()
    @Post('/register')
    register(@Body() signUpDto: SignUpDto) {
      return this.authService.signUp(signUpDto);
    }

    //@UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
    return req.name;
  }
}
