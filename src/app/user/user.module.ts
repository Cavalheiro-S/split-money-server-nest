import { Module } from "@nestjs/common";
import { UserService } from "./domain/user.service";
import { UserRepositoryProvider } from "./persitence/repository.provider";
import { PrismaModule } from "src/infra/database/prisma/prisma.module";
import { UserController } from "./api/user.controller";
import { ManipulateTokenService } from "../auth/domain/manipulate.token.service";

@Module({
    imports: [PrismaModule],
    controllers: [UserController],
    providers: [UserRepositoryProvider, UserService, ManipulateTokenService],
    exports: [UserService]
})
export class UserModule { }