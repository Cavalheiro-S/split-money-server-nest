import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as dayjs from "dayjs";
import { CreateUserDTO } from "src/app/user/api/create-user.dto";
import { UserService } from "../../user/domain/user.service";
import { SignInDTO } from "../api/sign-in.dto";
import { WrongCredentialsException } from "src/app/auth/error/wrong-credentials.error";

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async signIn(dto: SignInDTO) {
        const user = await this.userService.findOne(dto.email);

        if (!user || user?.password !== dto.password)
            throw new WrongCredentialsException();
        const access_token = await this.jwtService.signAsync({ email: dto.email, id: user.id })
        return {
            access_token: access_token,
            expiresIn: dayjs(new Date()).add(15, "minutes").unix()
        }
    }

    async signUp(dto: CreateUserDTO) {
        const user = await this.userService.findOne(dto.email);
        if (user) {
            return { message: "User already exists" };
        }
        const createdUser = await this.userService.create(dto);
        const access_token = await this.jwtService.signAsync({ email: dto.email, id: createdUser.id })
        return {
            access_token,
            expiresIn: dayjs(new Date()).add(15, "minutes").unix()
        }
    }

}