import { BadRequestException, Injectable } from "@nestjs/common";
import { UpdateTransactionDTO } from "../../api/update-transaction.dto";
import { ITransactionRepository } from "../../persistence/repository.interface";
import { TransactionRepo } from "../../persistence/transaction.repository.provide";

@Injectable()
export class UpdateTransactionService {
    constructor(@TransactionRepo private readonly transactionRepository: ITransactionRepository) { }

    async updateTransaction(id: string, dto: UpdateTransactionDTO) {
        const transaction = await this.transactionRepository.getTransaction(id, dto.userId);
        if (!transaction) {
            throw new BadRequestException("Transaction not found");
        }
        return this.transactionRepository.updateTransaction(id, dto);
    }
}