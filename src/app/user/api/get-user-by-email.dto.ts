import { IsEmail, IsNotEmpty } from "class-validator";


export class GetUserByEmailDTO{
    @IsNotEmpty()
    @IsEmail()
    email: string
}