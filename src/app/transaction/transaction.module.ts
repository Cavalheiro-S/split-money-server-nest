import { Module } from "@nestjs/common";
import { PrismaModule } from "src/infra/database/prisma/prisma.module";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../user/user.module";
import { TransactionController } from "./api/transaction.controller";
import { CreateTransactionService } from "./domain/services/create-transaction.service";
import { DeleteTransactionService } from "./domain/services/delete-transaction.service";
import { ListTransactionService } from "./domain/services/list-transaction.service";
import { UpdateTransactionService } from "./domain/services/update-transaction.service";
import { TransactionMapper } from "./mappers/transaction.mapper";
import { TransactionRepositoryProvide } from "./persistence/transaction.repository.provide";

@Module({
    imports: [PrismaModule, AuthModule, UserModule],
    controllers: [TransactionController],
    providers: [
        CreateTransactionService,
        ListTransactionService,
        UpdateTransactionService,
        DeleteTransactionService,
        TransactionRepositoryProvide,
        TransactionMapper
    ],
})
export class TransactionModule { }