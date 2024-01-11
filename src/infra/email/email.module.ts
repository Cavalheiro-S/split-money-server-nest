import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { Module } from "@nestjs/common";
import { join } from "path";
import { ManipulateTokenService } from "src/app/auth/domain/manipulate.token.service";
import { UserModule } from "src/app/user/user.module";
import { PrismaModule } from "../database/prisma/prisma.module";
import { EmailService } from "./email.service";
import { EmailTokenProvide } from "./persistence/email-token.repository.provide";

@Module({
    imports: [UserModule, PrismaModule, MailerModule.forRoot({
        transport: {
            host: 'smtp.gmail.com',
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD
            },
        },
        defaults: {
            from: "Split Money <split-money@gmail.com>"
        },
        template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
                strict: true
            }
        }
    })],
    providers: [
        EmailService,
        ManipulateTokenService,
        EmailTokenProvide],
    exports: [EmailService],
})
export class EmailModule { }