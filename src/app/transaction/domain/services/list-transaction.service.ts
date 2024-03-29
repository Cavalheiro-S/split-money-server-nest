import { Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "src/app/user/domain/user.service";
import { FilterTransactionDTO } from "../../api/filter-transaction.dto";
import { ITransactionRepository } from "../../persistence/repository.interface";
import { TransactionRepo } from "../../persistence/transaction.repository.provide";

@Injectable()
export class ListTransactionService {
    constructor(
        @TransactionRepo private readonly transactionRepository: ITransactionRepository,
        private readonly userService: UserService
    ) { }

    async listTransaction(filter: FilterTransactionDTO, userId: string) {
        const user = await this.userService.findUserById(userId)
        if (!user) throw new NotFoundException("User not found")
        return this.transactionRepository.listTransactions(filter, userId);
    }

}