import { Transform, Type } from "class-transformer";
import { IsIn, IsNotEmpty, Min, ValidateIf, ValidateNested } from "class-validator";
import { TransactionReccurencyDTO } from "./transaction.dto";

export class CreateTransactionDTO {

    @Min(0)
    amount: number;

    @IsNotEmpty()
    category: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    date: string;

    @Transform(({ value }) => value.toUpperCase())
    @IsIn(["OUTCOME", "INCOME"])
    type: string;

    recurrent: boolean;

    @ValidateIf(o => o.recurrent)
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => TransactionReccurencyDTO)
    recurrence: TransactionReccurencyDTO

}

