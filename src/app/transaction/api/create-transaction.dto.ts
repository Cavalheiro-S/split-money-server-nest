import { Transform } from "class-transformer";
import { IsDate, IsIn, IsNotEmpty, Min } from "class-validator";

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
}