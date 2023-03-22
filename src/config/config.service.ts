import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];

    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    } else {
      //console.log(`env.${key} ${this.env[key]}  OK `);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public newConnection: any = {
    type: 'mysql',
    host: this.getValue('MYSQL_HOSTD'),
    port: parseInt(this.getValue('MYSQL_PORTD')),
    username: this.getValue('MYSQL_USERD'),
    password: this.getValue('MYSQL_PASSWORDD'),
    database: this.getValue('MYSQL_DATABASED'),
    synchronize: true,
    entities: ['dist/**/*.entity.js'],

    migrationsTableName: 'migration',

    migrations: [`./migration/*.ts`],

    cli: {
      migrationsDir: 'migration/',
    },

    ssl: this.isProduction(),
  };

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.getValue('MYSQL_HOSTD'),
      port: parseInt(this.getValue('MYSQL_PORTD')),
      username: this.getValue('MYSQL_USERD'),
      password: this.getValue('MYSQL_PASSWORDD'),
      database: this.getValue('MYSQL_DATABASED'),
      synchronize: false,
      entities: ['dist/**/*.entity.js'],
      logging: false,
      migrationsTableName: 'migration',

      //migrations: [`migration/**/*{.ts,.js}`],

      // cli: {
      //   migrationsDir: 'migration/',
      // },

      ssl: this.isProduction(),
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'MYSQL_HOSTD',
  'MYSQL_PORTD',
  'MYSQL_USERD',
  'MYSQL_PASSWORDD',
  'MYSQL_DATABASED',
]);

export { configService };
