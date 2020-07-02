import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VacationsModule } from './vacations/vacations.module';
import { GalleryModule } from './gallery/gallery.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UsersModule,
    VacationsModule,
    GalleryModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
