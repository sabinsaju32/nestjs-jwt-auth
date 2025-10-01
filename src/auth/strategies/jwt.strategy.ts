import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
    constructor(private configService: ConfigService)
    {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
            (req) => req?.cookies?.access_token, 
            ]),
            ignoreExpiration:false,
            secretOrKey:configService.get<string>('JWT_SECRET'),
        });
        console.log('JwtStrategy constructed');
    }
    async validate(payload:{id:number;username:string}) {
        console.log(payload);
        return payload; 
    }   
}

