import { Module } from "@nestjs/common";
import { TransactionController } from "./api/transaction.controller";
import { CreateTransactionService } from "./domain/services/create-transaction.service";
import { ListTransactionService } from "./domain/services/list-transaction.service";
import { TransactionRepository } from "./persistence/repository";
import { TransactionMapper } from "./mappers/transaction.mapper";
import { PrismaModule } from "src/infra/database/prisma/prisma.module";
import { UpdateTransactionService } from "./domain/services/update-transaction.service";
import { DeleteTransactionService } from "./domain/services/delete-transaction.service";
import { TransactionRepositoryProvide } from "./persistence/transaction.repository.provide";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [PrismaModule, AuthModule],
    controllers: [TransactionController],
    providers: [
        CreateTransactionService,
        ListTransactionService,
        UpdateTransactionService,
        DeleteTransactionService,
        TransactionRepositoryProvide,
        TransactionMapper,
    ],
    exports: [TransactionModule]
})
export class TransactionModule { }