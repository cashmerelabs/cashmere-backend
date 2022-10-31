import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsoleModule } from 'nestjs-console';

@Module({
  imports: [ConsoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
