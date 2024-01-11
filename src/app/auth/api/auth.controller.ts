
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../domain/auth.service';
import { SignInDTO } from './sign-in.dto';
import { SignUpDTO } from './sign-up.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('login')
    signIn(@Body() signInDTO: SignInDTO) {
        return this.authService.signIn(signInDTO);
    }

    @Post('signup')
    signUp(@Body() signUpDTO: SignUpDTO) {
        return this.authService.signUp(signUpDTO);
    }
}