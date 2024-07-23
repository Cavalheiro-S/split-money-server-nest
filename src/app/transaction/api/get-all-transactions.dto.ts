import { IsNotEmpty } from "class-validator";
import { Pagination } from "src/app/shared/api/pagination.dto";
import { TransactionDTO } from "./transaction.dto";

export class GetAllTransactions extends Pagination<TransactionDTO>{

    @IsNotEmpty()
    userId: string
}