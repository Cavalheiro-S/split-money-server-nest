import { CreateTransactionDTO } from "../api/create-transaction.dto";
import { GetAllTransactions } from "../api/get-all-transactions.dto";
import { GetTransactionByUserDTO } from "../api/get-transaction-by-user.dto";
import { TransactionDTO } from "../api/transaction.dto";
import { UpdateTransactionDTO } from "../api/update-transaction.dto";

export interface ITransactionRepository {
    createTransaction(dto: CreateTransactionDTO): Promise<TransactionDTO>;
    getTransaction(id: string, userId: string): Promise<TransactionDTO>;
    listTransactionByType(dto: GetTransactionByUserDTO): Promise<TransactionDTO[]>;
    listTransactions(userId: string, page: number, count: number): Promise<TransactionDTO[]>;
    deleteTransaction(id: string, userId: string): Promise<void>;
    updateTransaction(id: string, dto: UpdateTransactionDTO): Promise<TransactionDTO>;
}