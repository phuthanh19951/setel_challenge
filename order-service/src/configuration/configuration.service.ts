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
    
      get IS_DEVELOPMENT(): boolean {
        return process.env.NODE_ENV === 'development';
      }
    
      get PROTOCOL(): string {
          return this.IS_DEVELOPMENT ? 'http' : 'https';
      }

      get DATABASE_CONFIG(): TypeOrmModuleOptions | any {
        return {
          ...databaseConfiguration,
        };
      }

      get PAYMENT_SERVICE(): any {
        return {
          HOST: process.env.PAYMENT_SERVICE_HOST,
          PORT: process.env.PAYMENT_SERVICE_PORT
        }
      }

      get AUTH_SERVICE_JWT(): any {
        return {
          SECRET: process.env.AUTH_JWT_SECRET,
          EXPIRED_IN: process.env.AUTH_JWT_EXPIRED_TIME.toString()
        }
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
          DATABASE_HOST: Joi.string().required(),
          DATABASE_NAME: Joi.string().required(),
          DATABASE_USER: Joi.string().required(),
          DATABASE_PORT: Joi.number(),
          DATABASE_PASSWORD: Joi.string().required(),
          APP_HOST: Joi.string().required(),
          PAYMENT_SERVICE_HOST: Joi.string().required(),
          PAYMENT_SERVICE_PORT: Joi.string().required()
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