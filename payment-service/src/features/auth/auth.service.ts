import { Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "src/configuration/configuration.service";

@Injectable()
export class AuthService {
  private readonly fakeUser = {
    username: "admin",
    password: "password_in_hash",
  };

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  // Use the fake user information to validate user.
  async validateUser(token: string): Promise<any> {
    const decodedToken: any = await this.jwtService.decode(token);
	
	if(!decodedToken) return false;

	const { username, password } = decodedToken;

    if (username === this.fakeUser.username && password === this.fakeUser.password) {
		return true;
    }

	return false;
  }

  async validateToken(token: string): Promise<any> {
    return await this.jwtService.verify(token, {
      secret: this.configService.AUTH_SERVICE_JWT.SECRET,
    });
  }
}
