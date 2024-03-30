import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { CreateTransactionDTO } from "../api/create-transaction.dto";
import { GetTransactionByUserDTO } from "../api/get-transaction-by-user.dto";
import { TransactionDTO } from "../api/transaction.dto";
import { UpdateTransactionDTO } from "../api/update-transaction.dto";
import { TransactionMapper } from "../mappers/transaction.mapper";
import { ITransactionRepository } from "./repository.interface";
import { FilterTransactionDTO } from "../api/filter-transaction.dto";

@Injectable()
export class TransactionRepository implements ITransactionRepository {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly transactionMapper: TransactionMapper) { }

    async listTransactions(filter: FilterTransactionDTO, userId: string): Promise<TransactionDTO[]> {
        const where = {
            userId: userId,
            ...(filter.type && { type: filter.type })
        }
        const transactions = await this.prismaService.transaction.findMany({
            where,
            take: filter.count ? Number(filter.count) : 10,
            skip: filter.page > 0 ? (filter.page - 1) * filter.count : 0
        })
        return transactions.map(transaction => this.transactionMapper.toDTO(transaction))
    }

    async getTransaction(id: string, userId: string): Promise<TransactionDTO> {
        const transaction = await this.prismaService.transaction.findUnique({
            where: {
                id: id,
                userId
            }
        })
        if (!transaction) {
            throw new BadRequestException("Transaction not found")
        }
        return this.transactionMapper.toDTO(transaction)
    }

    async createTransaction(dto: CreateTransactionDTO, userId: string): Promise<TransactionDTO> {
        const transaction = await this.prismaService.transaction.create({
            data: {
                amount: dto.amount,
                category: dto.category,
                date: new Date(dto.date),
                description: dto.description,
                type: dto.type,
                userId
            }
        })

        if (!transaction) {
            throw new BadRequestException("Transaction not created")
        }
        return this.transactionMapper.toDTO(transaction)
    }

    async updateTransaction(id: string, dto: UpdateTransactionDTO, userId: string): Promise<TransactionDTO> {
        const transaction = await this.prismaService.transaction.update({
            where: {
                id: id,
                userId
            },
            data: {
                amount: dto.amount,
                category: dto.category,
                date: new Date(dto.date),
                description: dto.description,
                type: dto.type,
            }
        })
        return this.transactionMapper.toDTO(transaction)
    }

    async deleteTransaction(id: string, userId: string): Promise<void> {
        const transaction = await this.prismaService.transaction.delete({
            where: {
                id: id,
                userId
            }
        })
        if (!transaction)
            throw new BadRequestException("Transaction not found")
    }
}