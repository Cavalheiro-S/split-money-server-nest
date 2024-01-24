import { Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "src/app/user/domain/user.service";
import { GetTransactionByUserDTO } from "../../api/get-transaction-by-user.dto";
import { ITransactionRepository } from "../../persistence/repository.interface";
import { TransactionRepo } from "../../persistence/transaction.repository.provide";

@Injectable()
export class ListTransactionService {
    constructor(
        @TransactionRepo private readonly transactionRepository: ITransactionRepository,
        private readonly userService: UserService
    ) { }

    async listTransaction(userId: string, page: number, count: number) {
        const user = await this.userService.findUserById(userId)
        if (!user) throw new NotFoundException("User not found")
        return this.transactionRepository.listTransactions(userId, page, count);
    }

    async listTransactionByType(dto: GetTransactionByUserDTO) {
        const user = await this.userService.findUserById(dto.userId)
        if (!user) throw new NotFoundException("User not found")
        return this.transactionRepository.listTransactionByType(dto);
    }
}