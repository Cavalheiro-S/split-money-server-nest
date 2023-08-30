import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDTO } from "src/app/user/api/create-user.dto";
import { UserService } from "../../user/domain/user.service";
import { SignInDTO } from "../api/sign-in.dto";
import { JwtService } from "@nestjs/jwt";
import { AUTH } from "src/app/shared/auth.const";

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async signIn(dto: SignInDTO) {
        const user = await this.userService.findOne(dto.email);

        if (user?.password !== dto.password)
            throw new UnauthorizedException();
        const access_token = await this.jwtService.signAsync({ email: dto.email, id: user.id })
        return {
            access_token: access_token,
            expiresIn: AUTH.ACCESS_TOKEN_EXPIRES_TIME_IN_UNIX
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
            expiresIn: AUTH.ACCESS_TOKEN_EXPIRES_TIME_IN_UNIX
        }
    }

}