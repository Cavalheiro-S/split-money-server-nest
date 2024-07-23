import { Transform } from "class-transformer";
import { IsDateString, IsIn, IsOptional, } from "class-validator";
import { Pagination } from "src/app/shared/api/pagination.dto";
import { TransactionDTO } from "./transaction.dto";

export class FilterTransactionDTO extends Pagination<TransactionDTO> {
    @Transform(({ value }) => value.toUpperCase())
    @IsIn(["OUTCOME", "INCOME"])
    @IsOptional()
    type: string;

    @IsDateString()
    @IsOptional()
    period: string;
}