import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpException, ValidationPipe, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Public } from 'src/auth/auth.decorators';
import { Throttle } from '@nestjs/throttler';

@Throttle({default: { limit: 12, ttl: 60000}})
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() newUser: CreateUserDto): Promise<User | HttpException> {
    return this.userService.createUser(newUser);
  }

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Public()
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): Promise<User | HttpException> {
    return this.userService.getUser(id);
  }

  @Patch(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
