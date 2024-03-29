import { Transform } from "class-transformer";
import { IsIn, IsOptional, } from "class-validator";
import { Pagination } from "src/app/shared/api/pagination.dto";

export class FilterTransactionDTO extends Pagination {
    @Transform(({ value }) => value.toUpperCase())
    @IsIn(["OUTCOME", "INCOME"])
    @IsOptional()
    type: string;
}