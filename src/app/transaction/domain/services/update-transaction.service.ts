import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UpdateTransactionDTO } from "../../api/update-transaction.dto";
import { ITransactionRepository } from "../../persistence/repository.interface";
import { TransactionRepo } from "../../persistence/transaction.repository.provide";
import { UserService } from "src/app/user/domain/user.service";

@Injectable()
export class UpdateTransactionService {
    constructor(
        @TransactionRepo private readonly transactionRepository: ITransactionRepository,
        private readonly userService: UserService
        ) { }

    async updateTransaction(id: string, dto: UpdateTransactionDTO) {
        const user = await this.userService.findUserById(dto.userId)
        if(!user) throw new NotFoundException("User not found")
        const transaction = await this.transactionRepository.getTransaction(id, dto.userId);
        if (!transaction) {
            throw new BadRequestException("Transaction not found");
        }
        return this.transactionRepository.updateTransaction(id, dto);
    }
}