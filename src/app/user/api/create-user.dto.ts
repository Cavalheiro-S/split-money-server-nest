import { IsNotEmpty } from "class-validator";

export class CreateUserDTO{
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
    
    name: string;
}