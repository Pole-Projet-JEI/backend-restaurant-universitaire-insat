import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {Request} from 'express';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService: JwtService){}

    canActivate(
        context: ExecutionContext,
    ):boolean{
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if(!token){
            throw new UnauthorizedException("invalid token");

        }
        const payload = this.jwtService.verify(token);
        try {
            const payload = this.jwtService.verify(token);
        }catch(e){
            Logger.error(e.message);
            throw new UnauthorizedException("Invalid token");
        }
        return true;
    }


    private extractTokenFromHeader(request: Request): string | undefined{
        return request.headers.authorization?.split(' ')[1];
    }
}