import { Injectable } from "@nestjs/common";
import { CreateTransactionDTO } from "../../api/create-transaction.dto";
import { ITransactionRepository } from "../../persistence/repository.interface";
import { TransactionRepo } from "../../persistence/transaction.repository.provide";

@Injectable()
export class CreateTransactionService {

    constructor(@TransactionRepo private readonly transactionRepository: ITransactionRepository) { }

    createTransaction(dto: CreateTransactionDTO) {
        return this.transactionRepository.createTransaction(dto);
    }
}