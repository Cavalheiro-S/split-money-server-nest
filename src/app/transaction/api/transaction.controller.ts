import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateTransactionService } from "../domain/services/create-transaction.service";
import { DeleteTransactionService } from "../domain/services/delete-transaction.service";
import { ListTransactionService } from "../domain/services/list-transaction.service";
import { UpdateTransactionService } from "../domain/services/update-transaction.service";
import { CreateTransactionDTO } from "./create-transaction.dto";
import { UpdateTransactionDTO } from "./update-transaction.dto";
import { AuthGuard } from "src/app/auth/api/auth.guard";

@UseGuards(AuthGuard)
@Controller("transaction")
export class TransactionController {

    constructor(
        private readonly createTransactionService: CreateTransactionService,
        private readonly listTransactionService: ListTransactionService,
        private readonly deleteTransactionService: DeleteTransactionService,
        private readonly updateTransactionService: UpdateTransactionService
    ) { }

    @Get()
    getTransaction() {
        return this.listTransactionService.listTransaction();
    }

    @Post()
    createTransaction(@Body() dto: CreateTransactionDTO) {
        return this.createTransactionService.createTransaction(dto);
    }

    @Delete(":id")
    deleteTransaction(@Param("id") id: string) {
        return this.deleteTransactionService.deleteTransaction(id);
    }

    @Patch(":id")
    updateTransaction(@Param("id") id: string, @Body() dto: UpdateTransactionDTO) {
        return this.updateTransactionService.updateTransaction(id, dto);
    }
}