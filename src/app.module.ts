import { Module } from '@nestjs/common';
import { ApiModule } from './app/api.module';

@Module({
  imports: [ApiModule],
})
export class AppModule { }
