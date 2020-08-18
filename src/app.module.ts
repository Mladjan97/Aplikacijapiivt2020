import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigutration } from 'config/database.configuration';
import { Administrator } from 'entities/administrator.entity';
import { AdministratorService } from './services/administrator/administrator.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfigutration.hostname,
      port: 3306,
      username: DatabaseConfigutration.username,
      password: DatabaseConfigutration.password,
      database: DatabaseConfigutration.database,
      entities: [ Administrator ]
    }),
    TypeOrmModule.forFeature([ Administrator ])
  ],
  controllers: [AppController],
  providers: [AdministratorService],
})
export class AppModule {}
