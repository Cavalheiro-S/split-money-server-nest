import { IsNotEmpty } from "class-validator";

export class RecoverPasswordDTO {

    @IsNotEmpty()
    email: string
}