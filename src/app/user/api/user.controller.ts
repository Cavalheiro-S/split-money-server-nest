import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/app/auth/api/auth.guard";
import { UserService } from "../domain/user.service";
import { GetUserByEmailDTO } from "./get-user-by-email.dto";

@UseGuards(AuthGuard)
@Controller("user")
export class UserController {

    constructor(private userService: UserService) { }

    @Post("getByEmail")
    getUserByEmail(@Body() dto: GetUserByEmailDTO) {
        return this.userService.findOne(dto.email)
    }
}