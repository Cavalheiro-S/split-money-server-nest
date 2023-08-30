import { IsNotEmpty } from "class-validator";
import { CreateTransactionDTO } from "./create-transaction.dto";

export class UpdateTransactionDTO extends CreateTransactionDTO{

    @IsNotEmpty()
    id: string;
}