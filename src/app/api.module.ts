import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { TransactionModule } from './transaction/transaction.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './shared/transform.interceptor';
@Module({
  imports: [PrismaModule, TransactionModule, AuthModule, UserModule],
  providers: [PrismaModule, TransactionModule,
  {
    provide: APP_INTERCEPTOR,
    useClass: TransformInterceptor
  }],
})
export class ApiModule { }
