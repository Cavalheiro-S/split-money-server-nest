import { BadRequestException, Injectable } from "@nestjs/common";
import PrismaType from "@prisma/client/index";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { CreateTransactionDTO } from "../api/create-transaction.dto";
import { FilterTransactionDTO } from "../api/filter-transaction.dto";
import { TransactionDTO } from "../api/transaction.dto";
import { UpdateTransactionDTO } from "../api/update-transaction.dto";
import { TransactionMapper } from "../mappers/transaction.mapper";
import { ITransactionRepository } from "./repository.interface";
import * as dayjs from "dayjs";
import { Pagination } from "src/app/shared/api/pagination.dto";
import { Transaction } from "../domain/transaction";

@Injectable()
export class TransactionRepository implements ITransactionRepository {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly transactionMapper: TransactionMapper) { }

    async listTransactions(filter: FilterTransactionDTO, userId: string): Promise<Pagination<TransactionDTO>> {
        const date = new Date(filter.period);

        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const firstDayOfNextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        const where: PrismaType.Prisma.TransactionWhereInput = {
            userId: userId,
            ...(filter.type && { type: filter.type }),
            ...(filter.period && {
                date: {
                    gte: firstDayOfMonth,
                    lt: firstDayOfNextMonth,
                },
            })
        }
        const transactions = await this.prismaService.transaction.findMany({
            where,
            take: filter.count ? Number(filter.count) : 10,
            skip: filter.page > 0 ? (filter.page - 1) * filter.count : 0
        })
        const transactionsMapped = transactions.map(transaction => this.transactionMapper.toDTO(transaction))

        return {
            data: transactionsMapped,
            total: await this.prismaService.transaction.count({ where }),
            page: Number(filter.page),
            count: Number(filter.count)
        }
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

    async createTransactionRecurrent(dto: CreateTransactionDTO, userId: string, parentTransactionId: string): Promise<Number> {
        const interval = dto.recurrence.interval.toLocaleLowerCase() as dayjs.ManipulateType
        const data: PrismaType.Prisma.TransactionCreateManyInput[] = []

        for (let i = 1; i <= dto.recurrence.occurrences; i++) {
            const date = new Date(dto.date)
            const dateAdded = dayjs(date).add(i, interval)
            data.push({
                amount: dto.amount,
                category: dto.category,
                date: dateAdded.toDate(),
                description: dto.description,
                type: dto.type,
                parentId: parentTransactionId,
                userId
            })
        }
        const transaction = await this.prismaService.transaction.createMany({ data })

        return transaction.count
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
        const transaction = await this.prismaService.transaction.findUnique({
            where: {
                id: id,
                userId
            }
        })
        if (!transaction?.parentId) {
            await this.prismaService.transaction.deleteMany({
                where: {
                    parentId: transaction.id
                }
            })
        }
        await this.prismaService.transaction.delete({
            where: {
                id: id,
                userId
            }
        })
        if (!transaction)
            throw new BadRequestException("Transaction not found")
    }
}