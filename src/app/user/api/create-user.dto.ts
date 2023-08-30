import { IsNotEmpty, Min, Equals } from "class-validator";

export class CreateUserDTO{
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
    
    name: string;

    @IsNotEmpty()
    loginMethod: string

    @Min(0)
    balance: number
}