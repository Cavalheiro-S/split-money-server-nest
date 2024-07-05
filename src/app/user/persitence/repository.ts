import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { CreateUserDTO } from "../api/create-user.dto";

@Injectable()
export class UserRepository {

    constructor(private readonly prismaService: PrismaService) { }

    async findOne(email: string) {
        return this.prismaService.user.findUnique({ where: { email } });
    }

    async findUserById(id: string) {
        return this.prismaService.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                loginMethod: true,
                balance: true
            }
        });
    }

    async create(dto: CreateUserDTO) {
        return this.prismaService.user.create({
            data: {
                email: dto.email,
                password: dto.password,
                name: dto.name,
                loginMethod: dto.loginMethod,
                balance: dto.balance
            }
        });
    }
}