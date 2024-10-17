import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from './auth.guard';
import { SignUpDto } from './dto/sign-up.dto';
import { Public } from './auth.decorators';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('login')
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @Public()
    @Post('/register')
    register(@Body() signUpDto: SignUpDto) {
      return this.authService.signUp(signUpDto);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
    return req.username;
  }
}
