import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from 'src/configuration/configuration.service';
import { AuthService } from './auth.service';

@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.AUTH_SERVICE_JWT.SECRET,
                signOptions: { expiresIn: configService.AUTH_SERVICE_JWT.EXPIRED_IN }
            }),
        })
    ],
    providers: [AuthService],
    exports: [AuthService]
})

export class AuthModule {}
