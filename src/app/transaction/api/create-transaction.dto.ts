import { Transform } from "class-transformer";
import { IsIn, IsNotEmpty, Min } from "class-validator";

export class CreateTransactionDTO {

    @Min(0)
    amount: number;

    @IsNotEmpty()
    category: string;

    @IsNotEmpty()
    title: string;

    @Transform(({ value }) => value.toUpperCase())
    @IsIn(["OUTCOME", "INCOME"])
    type: string;

    @IsNotEmpty()
    userId: string;
}