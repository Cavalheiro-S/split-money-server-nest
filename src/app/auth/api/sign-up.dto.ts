import { SignInDTO } from "./sign-in.dto";

export class SignUpDTO extends SignInDTO{
    name: string;
    loginMethod: string;
    balance: number;
}