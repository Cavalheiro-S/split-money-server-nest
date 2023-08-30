import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { CreateTransactionDTO } from "../api/create-transaction.dto";
import { TransactionDTO } from "../api/transaction.dto";
import { TransactionMapper } from "../mappers/transaction.mapper";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ITransactionRepository } from "./repository.interface";
import { UpdateTransactionDTO } from "../api/update-transaction.dto";

@Injectable()
export class TransactionRepository implements ITransactionRepository {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly transactionMapper: TransactionMapper) { }

    async listTransaction(): Promise<TransactionDTO[]> {
        const transactions = await this.prismaService.transaction.findMany({
            where: {
                userId: "1"
            }
        })
        return transactions.map(transaction => this.transactionMapper.toDTO(transaction))
    }

    async getTransaction(id: string): Promise<TransactionDTO> {
        const transaction = await this.prismaService.transaction.findUnique({
            where: {
                id: id,
                userId: "1"
            }
        })
        if (!transaction) {
            throw new BadRequestException("Transaction not found")
        }
        return this.transactionMapper.toDTO(transaction)
    }

    async createTransaction(dto: CreateTransactionDTO): Promise<TransactionDTO> {

        const transaction = await this.prismaService.transaction.create({
            data: {
                amount: dto.amount,
                category: dto.category,
                title: dto.title,
                type: dto.type,
                userId: dto.userId
            }
        })

        if (!transaction) {
            throw new BadRequestException("Transaction not created")
        }
        return this.transactionMapper.toDTO(transaction)
    }

    async updateTransaction(id: string, dto: UpdateTransactionDTO): Promise<TransactionDTO> {
        const transaction = await this.prismaService.transaction.update({
            where: {
                id: id,
                userId: dto.userId
            },
            data: {
                amount: dto.amount,
                category: dto.category,
                title: dto.title,
                type: dto.type,
            }
        })


        return this.transactionMapper.toDTO(transaction)
    }

    async deleteTransaction(id: string): Promise<void> {
        const transaction = await this.prismaService.transaction.delete({
            where: {
                id: id
            }
        })
        if (!transaction)
            throw new BadRequestException("Transaction not found")
    }
}