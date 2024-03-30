import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTransactionDTO } from "../../api/create-transaction.dto";
import { ITransactionRepository } from "../../persistence/repository.interface";
import { TransactionRepo } from "../../persistence/transaction.repository.provide";
import { UserService } from "src/app/user/domain/user.service";

@Injectable()
export class CreateTransactionService {

    constructor(
        @TransactionRepo private readonly transactionRepository: ITransactionRepository,
        private readonly userService: UserService
    ) { }

    async createTransaction(dto: CreateTransactionDTO, userId: string) {
        const user = await this.userService.findUserById(userId)
        if (!user) throw new NotFoundException("User not found")
        return this.transactionRepository.createTransaction(dto, user.id);
    }
}