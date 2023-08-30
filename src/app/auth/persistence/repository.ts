import { Injectable } from "@nestjs/common";
import { AUTH } from "src/app/shared/auth.const";
import { PrismaService } from "src/infra/database/prisma/prisma.service";


@Injectable()
export class AuthRepository {

    constructor(private readonly prismaService: PrismaService) { }


    async createRefreshToken(userId: string, token: string) {
        const refreshToken = await this.prismaService.refreshToken.create({
            data: {
                userId: userId,
                token: token,
                expiresAt: AUTH.ACCESS_TOKEN_EXPIRES_TIME_IN_UNIX
            }
        })
        return refreshToken
    }
}