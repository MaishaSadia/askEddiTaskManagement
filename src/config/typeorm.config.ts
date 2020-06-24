import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '2635',
    database: 'taskmanagement',
    entities: [__dirname + '/../**/*.entity.{js,ts}'], //path to current directory and taking one step out of the current file then any folder and any file ending with .entity.js or ts
    synchronize: true,
};