import { Injectable } from "@nestjs/common";
import * as dayjs from "dayjs";
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
                expiresAt: dayjs(new Date()).add(15, "minutes").unix()
            }
        })
        return refreshToken
    }
}