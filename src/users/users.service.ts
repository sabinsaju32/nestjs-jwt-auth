import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo:Repository<User>
  ){}

  async createUser(userdto: CreateUserDto):Promise<User>
  {
    const hashedPassword = await argon2.hash(userdto.password);
    const user = this.userRepo.create({...userdto,password:hashedPassword});
    return this.userRepo.save(user);
  }


  async findOne(id:number) {
    return this.userRepo.findOne({where:{id}});

  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByUsername(username: string){
    return this.userRepo.findOne({ where: { username } });
  }

}
