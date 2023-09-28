import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ITransactionRepository } from "../../persistence/repository.interface";
import { TransactionRepo } from "../../persistence/transaction.repository.provide";
import { UserService } from "src/app/user/domain/user.service";

@Injectable()
export class DeleteTransactionService {
    constructor(
        @TransactionRepo private readonly transactionRepository: ITransactionRepository,
        private readonly userService: UserService
        ) { }

    async deleteTransaction(id: string, userId : string) {
        const user = await this.userService.findUserById(userId)
        if(!user) throw new NotFoundException("User not found")
        const transaction = await this.transactionRepository.getTransaction(id, userId);
        if (!transaction) {
            throw new BadRequestException("Transaction not found");
        }
        return this.transactionRepository.deleteTransaction(id, userId);
    }
}