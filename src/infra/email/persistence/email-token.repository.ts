import { Injectable } from "@nestjs/common";
import { EmailToken } from "@prisma/client";
import * as dayjs from "dayjs";
import { PrismaService } from "src/infra/database/prisma/prisma.service";

@Injectable()
export class EmailTokenRepository {
    constructor(private readonly prismaService: PrismaService) { }

    async createEmailToken(token: string, userId: string) : Promise<EmailToken> {
        const emailToken = await this.prismaService.emailToken.create({
            data: {
                token: token,
                expiresAt: dayjs().add(15, "minutes").toDate(),
                userId
            }
        });
        return emailToken
    }

    async getEmailTokenByUserId(userId: string) : Promise<EmailToken> {
        const emailToken = await this.prismaService.emailToken.findFirst({
            where: {
                userId
            }
        })

        return emailToken
    }
}