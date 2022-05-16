import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    private readonly fakeUser = {
        username: 'admin',
        password: 'password_in_hash',
    };

    constructor(private readonly jwtService: JwtService){}

    getDummyToken(): string{
        return this.jwtService.sign(this.fakeUser);
    }
}
