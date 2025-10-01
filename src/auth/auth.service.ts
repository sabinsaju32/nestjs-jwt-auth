import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as argon2 from 'argon2';


@Injectable()
export class AuthService {
    constructor(
        private jwtService:JwtService,
        private usersService:UsersService
    ){}

    async validateUser(loginDto:LoginDto)
    {
        const {username,password}=loginDto;
        const user=await this.usersService.findByUsername(username);
        if(!user)
        {
           throw new UnauthorizedException('Invalid credentials');
        }
        const isValid =await argon2.verify(user.password, password);
        if(!isValid){
           throw new UnauthorizedException('Invalid credentials');
        }
        const id=user.id;
        const token=this.jwtService.sign(
            {id ,username},
            {expiresIn: '1h'}
        ); 
        return token;
    }
}
