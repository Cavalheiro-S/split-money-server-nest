import { Inject, Injectable } from "@nestjs/common";
import { ITransactionRepository } from "../../persistence/repository.interface";
import { TransactionRepo } from "../../persistence/transaction.repository.provide";
import { GetTransactionByUserDTO } from "../../api/get-transaction-by-user.dto";
import { GetAllTransactions } from "../../api/get-all-transactions.dto";

@Injectable()
export class ListTransactionService {
    constructor(@TransactionRepo private readonly transactionRepository: ITransactionRepository) { }

    async listTransaction(userId: string) {
        return this.transactionRepository.listTransactions(userId);
    }

    async listTransactionByType(dto: GetTransactionByUserDTO) {
        return this.transactionRepository.listTransactionByType(dto);
    }
}