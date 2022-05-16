import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export declare class ConfigService {
    private readonly envConfig;
    constructor(filePath: string);
    get EXPRESS_PORT(): number;
    get EXPRESS_HOST(): string;
    get IS_DEVELOPMENT(): boolean;
    get PROTOCOL(): string;
    get DATABASE_CONFIG(): TypeOrmModuleOptions | any;
    get PAYMENT_SERVICE(): any;
    get AUTH_SERVICE_JWT(): any;
    get(key: string): string;
    private validateInput;
}
