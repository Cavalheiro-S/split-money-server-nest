import { Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "src/app/user/domain/user.service";
import { CreateTransactionDTO } from "../../api/create-transaction.dto";
import { ITransactionRepository } from "../../persistence/repository.interface";
import { TransactionRepo } from "../../persistence/transaction.repository.provide";

@Injectable()
export class CreateTransactionService {

    constructor(
        @TransactionRepo private readonly transactionRepository: ITransactionRepository,
        private readonly userService: UserService
    ) { }

    async createTransaction(dto: CreateTransactionDTO, userId: string) {
        const user = await this.userService.findUserById(userId)
        if (!user) throw new NotFoundException("User not found")
        if (dto.recurrent) {
            const transaction = await this.transactionRepository.createTransaction(dto, user.id);
            return this.transactionRepository.createTransactionRecurrent(dto, user.id, transaction.id);
        }
        return this.transactionRepository.createTransaction(dto, user.id);
    }
}