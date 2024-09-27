import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { AUTH } from "../shared/auth.const";
import { UserModule } from "../user/user.module";
import { AuthController } from "./api/auth.controller";
import { AuthService } from "./domain/auth.service";
import { AuthRepositoryProvider } from "./persistence/auth.repository.provider";
import { ManipulateTokenService } from "./domain/manipulate.token.service";
import { EmailModule } from "src/infra/email/email.module";
import { AuthRepository } from "./persistence/auth.repository";


@Module({
    imports: [
        UserModule,
        EmailModule,
        JwtModule.register({
            global: true,
            secret: AUTH.SECRET_KEY,
            signOptions: { expiresIn: '1h' },
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthRepositoryProvider, PrismaService, ManipulateTokenService, AuthRepository],
    exports: [AuthService, ManipulateTokenService]
})

export class AuthModule { }