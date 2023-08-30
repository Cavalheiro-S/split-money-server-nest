import { Transform } from "class-transformer";
import { Equals, IsIn, IsNotEmpty } from "class-validator";

export class GetTransactionByUserDTO {

    @IsNotEmpty()
    userId: string

    @IsNotEmpty()
    @Transform(({ value }) => value.toUpperCase())
    @IsIn(["OUTCOME", "INCOME"], { message: "Type should by equal to INCOME or OUTCOME" })
    type: string
}