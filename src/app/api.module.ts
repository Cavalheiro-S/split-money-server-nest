import { Module } from '@nestjs/common';
import { TransactionController } from './transaction/api/transaction.controller';

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [],
})
export class ApiModule {}
