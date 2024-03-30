import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/app/auth/api/auth.guard";
import { ManipulateTokenService } from "src/app/auth/domain/manipulate.token.service";
import { CreateTransactionService } from "../domain/services/create-transaction.service";
import { DeleteTransactionService } from "../domain/services/delete-transaction.service";
import { ListTransactionService } from "../domain/services/list-transaction.service";
import { UpdateTransactionService } from "../domain/services/update-transaction.service";
import { CreateTransactionDTO } from "./create-transaction.dto";
import { FilterTransactionDTO } from "./filter-transaction.dto";
import { UpdateTransactionDTO } from "./update-transaction.dto";

@UseGuards(AuthGuard)
@Controller("transaction")
export class TransactionController {

    constructor(
        private readonly createTransactionService: CreateTransactionService,
        private readonly listTransactionService: ListTransactionService,
        private readonly deleteTransactionService: DeleteTransactionService,
        private readonly updateTransactionService: UpdateTransactionService,
        private readonly manipulateTokenService: ManipulateTokenService
    ) { }

    @Patch()
    async updateTransaction(@Query("id") id: string, @Body() dto: UpdateTransactionDTO, @Headers("Authorization") token) {
        const userId = await this.manipulateTokenService.getIdFromToken(token)
        return this.updateTransactionService.updateTransaction(id, dto, userId);
    }

    @Get()
    async getTransactions(@Query() filter: FilterTransactionDTO, @Headers("Authorization") token) {
        const userId = await this.manipulateTokenService.getIdFromToken(token)
        return this.listTransactionService.listTransaction(filter, userId);
    }

    @Post()
    async createTransaction(@Body() dto: CreateTransactionDTO, @Headers("Authorization") token) {
        const userId = await this.manipulateTokenService.getIdFromToken(token)
        return this.createTransactionService.createTransaction(dto, userId);
    }

    @Delete()
    async deleteTransaction(@Query("id") id: string, @Headers("Authorization") bearerToken) {
        const userId = await this.manipulateTokenService.getIdFromToken(bearerToken)
        return this.deleteTransactionService.deleteTransaction(id, userId);
    }


}