import { BadRequestException, HttpStatus } from "@nestjs/common";

export class WrongCredentialsException extends BadRequestException {
    constructor() {
        super({
            message: "Email or password is incorrect",
            codeError: "email-password/invalid",
            statusCode: HttpStatus.BAD_REQUEST
        },);
    }
}