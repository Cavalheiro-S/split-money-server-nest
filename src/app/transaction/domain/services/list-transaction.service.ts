import { Inject, Injectable } from "@nestjs/common";
import { ITransactionRepository } from "../../persistence/repository.interface";
import { TransactionRepo } from "../../persistence/transaction.repository.provide";

@Injectable()
export class ListTransactionService {
    constructor(@TransactionRepo private readonly transactionRepository: ITransactionRepository) { }

    async listTransaction() {
        return this.transactionRepository.listTransaction();
    }

}