import { MailerService } from "@nestjs-modules/mailer";
import { BadRequestException, Injectable } from "@nestjs/common";
import { randomBytes } from "crypto";
import { UserService } from "src/app/user/domain/user.service";
import { EmailTokenRepository } from "./persistence/email-token.repository";
import { EmailTokenRepo } from "./persistence/email-token.repository.provide";
import { EmailToken } from "@prisma/client";

@Injectable()
export class EmailService {

    constructor(
        private readonly mailerService: MailerService,
        private readonly userService: UserService,
        @EmailTokenRepo private readonly emailTokenRepository: EmailTokenRepository) { }

    async changeUserEmailToVerificated(token: string, userId: string): Promise<boolean> {
        const emailToken = await this.emailTokenRepository.getEmailTokenByUserId(userId)
        if (!emailToken)
            throw new BadRequestException("Invalid email token")

        if (token === emailToken.token && emailToken.expiresAt < new Date()) {
            const userAuthenticated = await this.userService.updateToAuthenticated(userId)
            if(!userAuthenticated)
                throw new BadRequestException("Failed to authenticate user")
            return true
        }

        return false
    }

    async sendUserEmailConfirmation(email: string, userId: string): Promise<EmailToken> {
        const user = await this.userService.findUserById(userId)
        const emailToken = await this.createEmailToken(userId)
        if (!user || !emailToken)
            throw new BadRequestException("Failed to send user confirmation")
        const url = `${process.env.FRONTEND_URL}/confirmEmail`
        await this.mailerService.sendMail({
            to: email,
            subject: "Bem vindo ao split money, confirme seu email",
            template: "./confirmation",
            context: {
                name: user.name,
                url,
                verificationCode: emailToken.token
            }
        })
        return emailToken
    }

    private async createEmailToken(userId: string): Promise<EmailToken> {
        const size = 5;
        const token = randomBytes(size)
        return await this.emailTokenRepository.createEmailToken(token.toString("hex"), userId)
    }
}