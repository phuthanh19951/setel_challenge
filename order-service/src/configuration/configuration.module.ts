import { Global, Module } from '@nestjs/common';
import { ConfigService } from './configuration.service';

@Global()
@Module({
    providers: [
        {
          provide: ConfigService,
          useValue: new ConfigService(`.env`),
        },
      ],
      exports: [ConfigService],
})

export class ConfigurationModule {}
