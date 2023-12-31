import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { AUTH } from "../shared/auth.const";
import { UserModule } from "../user/user.module";
import { AuthController } from "./api/auth.controller";
import { AuthService } from "./domain/auth.service";
import { AuthRepositoryProvider } from "./persistence/repository.provider";
import { ManipulateTokenService } from "./domain/manipulate.token.service";


@Module({
    imports: [UserModule,
        JwtModule.register({
            global: true,
            secret: AUTH.SECRET_KEY,
            signOptions: { expiresIn: '1h' },
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthRepositoryProvider, PrismaService, ManipulateTokenService],
    exports: [AuthService,ManipulateTokenService]
})

export class AuthModule { }