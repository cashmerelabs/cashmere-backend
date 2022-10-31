import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsoleModule } from 'nestjs-console';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConsoleModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
