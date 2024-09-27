import { isNotEmpty, IsNotEmpty } from "class-validator";

export class ChangePasswordDTO {
    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    token: string
}