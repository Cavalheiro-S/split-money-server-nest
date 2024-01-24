import { IsNotEmpty } from "class-validator";
import { Pagination } from "src/app/shared/api/pagination.dto";

export class GetAllTransactions extends Pagination{

    @IsNotEmpty()
    userId: string
}