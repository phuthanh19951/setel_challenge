enum NODE_ENV {
    'development',
    'production',
    'test',
    'provision',
}

export interface Configuration {
    NODE_ENV: NODE_ENV;
    PORT: Number;
    DATABASE_HOST: string;
    DATABASE_NAME: string;
    DATABASE_USER: string;
    DATABASE_PORT: string;
    DATABASE_PASSWORD: string;
    PROTOCOL: string;
}