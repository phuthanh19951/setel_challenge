import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import { Configuration } from './configuration.interface';
import databaseConfiguration from './database';

export class ConfigService {
    private readonly envConfig: Configuration;

    constructor(filePath: string) {
        dotenv.config({ path: filePath });
        this.envConfig = this.validateInput(process.env);
      }

      get EXPRESS_PORT(): number {
        return Number(this.envConfig.PORT);
      }

      get EXPRESS_HOST(): string {
        return process.env.APP_HOST || '127.0.0.1';
      }
    
      get IS_PRODUCTION(): boolean {
        return process.env.NODE_ENV === 'production';
      }
    
      get PROTOCOL(): string {
          return this.IS_PRODUCTION ? 'https' : 'http';
      }

      get AUTH_SERVICE_JWT(): any {
        return {
          SECRET: process.env.AUTH_JWT_SECRET
        }
      }

      get IS_DEVELOPMENT(): boolean {
        return process.env.NODE_ENV === 'development';
      }

      get DATABASE_CONFIG(): TypeOrmModuleOptions | any {
        return {
          ...databaseConfiguration,
        };
      }

      get(key: string): string {
        return this.envConfig[key];
      }
    
      private validateInput(envConfig): Configuration {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
          NODE_ENV: Joi.valid(
            'development',
            'production',
            'test',
            'provision',
          ).default('development'),
          PORT: Joi.number().default(4000),
          APP_HOST: Joi.string().required(),
        }).options({ stripUnknown: true });
    
        const { error, value: validatedEnvConfig } = envVarsSchema.validate(
          envConfig,
        );
        if (error) {
          console.warn(`Config validation error: ${error.message}`);
          process.exit(1);
        }
        return validatedEnvConfig;
      }
}