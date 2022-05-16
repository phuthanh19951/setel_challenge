"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const configuration_service_1 = require("./configuration/configuration.service");
async function bootstrap() {
    const configService = new configuration_service_1.ConfigService('.env');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.listen(configService.EXPRESS_PORT, () => console.log(`Order Service is running on port ${configService.EXPRESS_PORT}`));
}
bootstrap();
//# sourceMappingURL=main.js.map