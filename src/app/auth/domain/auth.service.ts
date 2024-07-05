import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { WrongCredentialsException } from "src/app/auth/error/wrong-credentials.error";
import { AUTH } from "src/app/shared/auth.const";
import { CreateUserDTO } from "src/app/user/api/create-user.dto";
import { UserService } from "../../user/domain/user.service";
import { SignInDTO } from "../api/sign-in.dto";

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
        const access_token = await this.jwtService.signAsync(
            {
                email: dto.email,
                id: user.id
            }, {
            expiresIn: AUTH.JWT_VALID_SECONDS
        })
        return {
            access_token: access_token,
            expiresIn: AUTH.JWT_VALID_SECONDS
        }
    }

    async signUp(dto: CreateUserDTO) {
        const user = await this.userService.findOne(dto.email);
        if (user) {
            throw new BadRequestException("User already exists")
        }
        const createdUser = await this.userService.create(dto);
        const access_token = await this.jwtService.signAsync(
            {
                email: dto.email,
                id: createdUser.id
            }, {
            expiresIn: AUTH.JWT_VALID_SECONDS
        })
        return {
            access_token,
        }
    }

}