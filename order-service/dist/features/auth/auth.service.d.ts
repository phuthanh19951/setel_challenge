import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly jwtService;
    private readonly fakeUser;
    constructor(jwtService: JwtService);
    getDummyToken(): string;
}
