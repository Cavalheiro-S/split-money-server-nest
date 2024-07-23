import { Transform } from "class-transformer";
import { IsIn, IsNotEmpty, Min } from "class-validator";
import { TransactionRecurrencyIntervalEnum } from "../enum/transaction";

export class TransactionDTO {
    id: string;
    amount: number;
    description: string;
    date: string;
    type: string;
    category: string;
    recurrent: boolean;
    userId: string;
}

export class TransactionReccurencyDTO {

    @IsNotEmpty()
    @Transform(({ value }) => value.toUpperCase())
    @IsIn(Object.values(TransactionRecurrencyIntervalEnum))
    interval: string;

    @Min(1)
    @IsNotEmpty()
    occurrences: number;

}