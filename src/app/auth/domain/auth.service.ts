import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { WrongCredentialsException } from "src/app/auth/error/wrong-credentials.error";
import { AUTH, REDIRECT_CLIENT } from "src/app/shared/auth.const";
import { CreateUserDTO } from "src/app/user/api/create-user.dto";
import { EmailService } from "src/infra/email/email.service";
import { UserService } from "../../user/domain/user.service";
import { RecoverPasswordDTO } from "../api/recover-password.dto";
import { SignInDTO } from "../api/sign-in.dto";
import { AuthRepository } from "../persistence/auth.repository";
import { ChangePasswordDTO } from "../api/change-password.dto";

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private emailService: EmailService,
        private authRepository: AuthRepository

    ) { }

    async signIn(dto: SignInDTO) {
        const user = await this.userService.findOne(dto.email);

        if (!user || user?.password !== dto.password)
            throw new WrongCredentialsException();
        const access_token = await this.jwtService.signAsync(
            {
                email: dto.email,
                id: user.id
            }, {
            expiresIn: AUTH.JWT_VALID_SECONDS
        })
        return {
            access_token: access_token,
            expiresIn: AUTH.JWT_VALID_SECONDS
        }
    }

    async signUp(dto: CreateUserDTO) {
        const user = await this.userService.findOne(dto.email);
        if (user) {
            throw new BadRequestException("User already exists")
        }
        const createdUser = await this.userService.create(dto);
        const access_token = await this.jwtService.signAsync(
            {
                email: dto.email,
                id: createdUser.id
            }, {
            expiresIn: AUTH.JWT_VALID_SECONDS
        })
        return {
            access_token,
        }
    }

    async recoverPassword(dto: RecoverPasswordDTO) {
        const user = await this.userService.findOne(dto.email)
        if (!user) {
            throw new BadRequestException("Usuário não encontrado")
        }
        const alreadyToken = await this.authRepository.findRecoverPasswordTokenByUserId(user.id)
        if (alreadyToken) {
            await this.authRepository.deleteRecoverPasswordTokenByUserId(user.id)
        }
        const token = await this.authRepository.createRecoverPasswordToken(user.id)

        const subject = "Recuperação de Senha"
        const content = `<a href='${REDIRECT_CLIENT.RECOVER_PASSWORD_URL}?token=${token}'>Link de recuperação<a>`
        const result = await this.emailService.sendEmail(dto.email, content, subject)
        return result
    }

    async changePassword(dto: ChangePasswordDTO) {
        const token = await this.authRepository.findRecoverPasswordTokenByToken(dto.token)
        if (!token) {
            throw new BadRequestException("Link inválido, solicite outra senha")
        }
        if (!token.userId) {
            throw new BadRequestException("Usuário não encontrado")
        }
        const user = await this.userService.findUserById(token.userId)
        if (!user) {
            throw new BadRequestException("Usuário não encontrado")
        }
        const passwordUpdated = !!await this.userService.updatePassword(user.id, dto.password)
        if (passwordUpdated) {
            await this.authRepository.deleteRecoverPasswordTokenByUserId(token.userId)
            return true
        }
        return false
    }

    async validateRecoverPasswordToken(token: string) {
        const tokenExists = await this.authRepository.findRecoverPasswordTokenByToken(token)
        if (!tokenExists) {
            throw new BadRequestException("Token not found")
        }
        const hasToken = !!await this.authRepository.findRecoverPasswordTokenByToken(token)

        return hasToken
    }

}