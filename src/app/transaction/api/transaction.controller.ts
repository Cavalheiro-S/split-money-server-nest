import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, Headers } from "@nestjs/common";
import { AuthGuard } from "src/app/auth/api/auth.guard";
import { ManipulateTokenService } from "src/app/auth/domain/manipulate.token.service";
import { CreateTransactionService } from "../domain/services/create-transaction.service";
import { DeleteTransactionService } from "../domain/services/delete-transaction.service";
import { ListTransactionService } from "../domain/services/list-transaction.service";
import { UpdateTransactionService } from "../domain/services/update-transaction.service";
import { CreateTransactionDTO } from "./create-transaction.dto";
import { GetTransactionByUserDTO } from "./get-transaction-by-user.dto";
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

    @Patch(":id")
    updateTransaction(@Param("id") id: string, @Body() dto: UpdateTransactionDTO) {
        return this.updateTransactionService.updateTransaction(id, dto);
    }

    @Get("type")
    getTransactionByType(@Query() dto: GetTransactionByUserDTO) {
        return this.listTransactionService.listTransactionByType(dto);
    }

    @Get()
    getTransactions(
        @Query("userId") userId: string,
        @Query("page") page: number,
        @Query("count") count: number) {
        return this.listTransactionService.listTransaction(userId, page, count);
    }

    @Post()
    createTransaction(@Body() dto: CreateTransactionDTO) {
        return this.createTransactionService.createTransaction(dto);
    }

    @Delete(":id")
    async deleteTransaction(@Param("id") id: string, @Headers("Authorization") bearerToken) {
        const userId = await this.manipulateTokenService.getIdFromToken(bearerToken)
        return this.deleteTransactionService.deleteTransaction(id, userId);
    }


}