import { IsNotEmpty } from "class-validator";

export class GetAllTransactions{

    @IsNotEmpty()
    userId: string
}