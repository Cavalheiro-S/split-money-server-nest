import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class ManipulateTokenService {

    constructor(
        private readonly jwtService: JwtService
    ) { }

    async getIdFromToken(bearerToken: string) {
        const [_, token] = bearerToken.split(" ")
        const data = this.jwtService.decode(token)
        if(!data["id"])
            throw new UnauthorizedException("Token is not valid")
        return data["id"];
    }
}