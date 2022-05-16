"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const dotenv = require("dotenv");
const Joi = require("joi");
const database_1 = require("./database");
class ConfigService {
    constructor(filePath) {
        dotenv.config({ path: filePath });
        this.envConfig = this.validateInput(process.env);
    }
    get EXPRESS_PORT() {
        return Number(this.envConfig.PORT);
    }
    get EXPRESS_HOST() {
        return process.env.APP_HOST || '127.0.0.1';
    }
    get IS_DEVELOPMENT() {
        return process.env.NODE_ENV === 'development';
    }
    get PROTOCOL() {
        return this.IS_DEVELOPMENT ? 'http' : 'https';
    }
    get DATABASE_CONFIG() {
        return Object.assign({}, database_1.default);
    }
    get PAYMENT_SERVICE() {
        return {
            HOST: process.env.PAYMENT_SERVICE_HOST,
            PORT: process.env.PAYMENT_SERVICE_PORT
        };
    }
    get AUTH_SERVICE_JWT() {
        return {
            SECRET: process.env.AUTH_JWT_SECRET,
            EXPIRED_IN: process.env.AUTH_JWT_EXPIRED_TIME.toString()
        };
    }
    get(key) {
        return this.envConfig[key];
    }
    validateInput(envConfig) {
        const envVarsSchema = Joi.object({
            NODE_ENV: Joi.valid('development', 'production', 'test', 'provision').default('development'),
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
        const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig);
        if (error) {
            console.warn(`Config validation error: ${error.message}`);
            process.exit(1);
        }
        return validatedEnvConfig;
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=configuration.service.js.map