import { BadRequestException, Injectable } from "@nestjs/common";
import { ITransactionRepository } from "../../persistence/repository.interface";
import { TransactionRepo } from "../../persistence/transaction.repository.provide";

@Injectable()
export class DeleteTransactionService {
    constructor(@TransactionRepo private readonly transactionRepository: ITransactionRepository) { }

    async deleteTransaction(id: string) {
        const transaction = await this.transactionRepository.getTransaction(id);
        if (!transaction) {
            throw new BadRequestException("Transaction not found");
        }
        return this.transactionRepository.deleteTransaction(id);
    }
}