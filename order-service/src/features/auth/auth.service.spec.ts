import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '../../configuration/configuration.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({})
      ],
      providers: [AuthService],
      exports: [AuthService]
    }).compile();

    jwtService = module.get<JwtService>(JwtService);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should call jwt.sign function', () => {
    const result = 'jwt_token_in_hash';

    jest.spyOn(jwtService, 'sign').mockReturnValue(result);

    expect(authService.getDummyToken()).toEqual(result);
  });
});
