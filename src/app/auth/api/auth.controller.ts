
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from '../domain/auth.service';
import { SignInDTO } from './sign-in.dto';
import { SignUpDTO } from './sign-up.dto';
import { RecoverPasswordDTO } from './recover-password.dto';
import { ChangePasswordDTO } from './change-password.dto';

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

    @Post("requestRecoverPassword")
    recoverPassword(@Body() recoverPasswordDTO: RecoverPasswordDTO) {
        return this.authService.recoverPassword(recoverPasswordDTO);
    }

    @Post("changePassword")
    changePassword(@Body() changePasswordDTO: ChangePasswordDTO) {
        return this.authService.changePassword(changePasswordDTO);
    }
}