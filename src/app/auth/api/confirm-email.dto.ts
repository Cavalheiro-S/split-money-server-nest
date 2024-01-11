import { IsEmail, IsNotEmpty } from "class-validator";

export class ConfirmEmailDTO {

    @IsNotEmpty()
    token: string

    @IsNotEmpty()
    userId
}