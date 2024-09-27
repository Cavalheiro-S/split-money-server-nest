import { Injectable } from "@nestjs/common";
import * as dayjs from "dayjs";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { v4 as uuidv4 } from 'uuid';

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

    async createRecoverPasswordToken(userId: string) {
        const uuid = uuidv4()
        const recoverPassword = await this.prismaService.passwordReset.create({
            data: {
                userId,
                token: uuid,
                expiresAt: dayjs().add(1, "hour").toDate()
            }
        })

        return recoverPassword.token
    }

    async findRecoverPasswordTokenByUserId(userId: string) {
        return this.prismaService.passwordReset.findFirst({
            where: {
                userId,
                expiresAt: {
                    gt: dayjs().toDate()
                }
            }
        })
    }

    async findRecoverPasswordTokenByToken(token: string) {
        return this.prismaService.passwordReset.findFirst({
            where: {
                token,
                expiresAt: {
                    gt: dayjs().toDate()
                }
            },
            include: {
                user: {
                    select: {
                        id: true
                    }
                }
            }
        })
    }

    async deleteRecoverPasswordTokenByUserId(userId) {
        return this.prismaService.passwordReset.deleteMany({
            where: {
                userId
            }
        })
    }
}