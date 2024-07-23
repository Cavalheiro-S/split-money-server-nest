import { Pagination } from "src/app/shared/api/pagination.dto";
import { CreateTransactionDTO } from "../api/create-transaction.dto";
import { FilterTransactionDTO } from "../api/filter-transaction.dto";
import { TransactionDTO } from "../api/transaction.dto";
import { UpdateTransactionDTO } from "../api/update-transaction.dto";

export interface ITransactionRepository {
    createTransaction(dto: CreateTransactionDTO, userId: string): Promise<TransactionDTO>;
    createTransactionRecurrent(dto: CreateTransactionDTO, userId: string, parentTransactionId: string): Promise<Number>;
    getTransaction(id: string, userId: string): Promise<TransactionDTO>;
    listTransactions(filter: FilterTransactionDTO, userId: string): Promise<Pagination<TransactionDTO>>;
    deleteTransaction(id: string, userId: string): Promise<void>;
    updateTransaction(id: string, dto: UpdateTransactionDTO, userId: string): Promise<TransactionDTO>;
}