import { CreateTransactionDTO } from "../api/create-transaction.dto";
import { FilterTransactionDTO } from "../api/filter-transaction.dto";
import { TransactionDTO } from "../api/transaction.dto";
import { UpdateTransactionDTO } from "../api/update-transaction.dto";

export interface ITransactionRepository {
    createTransaction(dto: CreateTransactionDTO): Promise<TransactionDTO>;
    getTransaction(id: string, userId: string): Promise<TransactionDTO>;
    listTransactions(filter: FilterTransactionDTO, userId: string): Promise<TransactionDTO[]>;
    deleteTransaction(id: string, userId: string): Promise<void>;
    updateTransaction(id: string, dto: UpdateTransactionDTO): Promise<TransactionDTO>;
}