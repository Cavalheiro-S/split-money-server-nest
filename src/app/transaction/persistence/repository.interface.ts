import { CreateTransactionDTO } from "../api/create-transaction.dto";
import { TransactionDTO } from "../api/transaction.dto";
import { UpdateTransactionDTO } from "../api/update-transaction.dto";

export interface ITransactionRepository {
    createTransaction(dto: CreateTransactionDTO): Promise<TransactionDTO>;
    getTransaction(id: string): Promise<TransactionDTO>;
    listTransaction(): Promise<TransactionDTO[]>;
    deleteTransaction(id: string): Promise<void>;
    updateTransaction(id: string, dto: UpdateTransactionDTO): Promise<TransactionDTO>;
}