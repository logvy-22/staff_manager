import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const config: ConnectionOptions = {
  type: 'postgres',

  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,

  entities: ['**/*.entity{.ts, .js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  synchronize: true,
};

@Module({
  imports: [TypeOrmModule.forRoot(config)],
})
export class DatabaseModule {}
