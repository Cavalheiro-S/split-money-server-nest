import { Body, Controller, Get, Headers, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/app/auth/api/auth.guard";
import { UserService } from "../domain/user.service";
import { GetUserByEmailDTO } from "./get-user-by-email.dto";
import { ManipulateTokenService } from "src/app/auth/domain/manipulate.token.service";

@UseGuards(AuthGuard)
@Controller("user")
export class UserController {

    constructor(
        private userService: UserService,
        private readonly manipulateTokenService: ManipulateTokenService
    ) { }

    @Post("getByEmail")
    getUserByEmail(@Body() dto: GetUserByEmailDTO) {
        return this.userService.findOne(dto.email)
    }

    @Get("me")
    async getMe(@Headers("Authorization") bearerToken) {
        const userId = await this.manipulateTokenService.getIdFromToken(bearerToken)
        return this.userService.findUserById(userId)
    }
}