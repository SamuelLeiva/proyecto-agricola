import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>
  ) { }

  async createUser(user: CreateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        username: user.username
      }
    })

    if (userFound) {
      return new HttpException("User already exists", HttpStatus.CONFLICT);
    }

    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUser(id: number) {
    const userFound = await this.userRepository.findOne({
      where: { id }
    });

    if (!userFound) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    return userFound
  }

  async getUserByUsername(username: string): Promise<User | HttpException> {
    const userFound = await this.userRepository.findOne({
      where: { username }
    });

    console.log(userFound)

    if (!userFound) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    return userFound
  }

  async updateUser(id: number, user: UpdateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        id
      }
    })

    if(!userFound) {
      return new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    const updateUser = Object.assign(userFound, user);
    return this.userRepository.save(updateUser);
  }

  async deleteUser(id: number) {
    const result = await this.userRepository.delete({ id });

    if(result.affected === 0){
      return new HttpException("User not found", HttpStatus.NOT_FOUND)
    }

    return result;
  }
}
