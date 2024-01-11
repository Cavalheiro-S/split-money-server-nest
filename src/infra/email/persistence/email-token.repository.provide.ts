import { Inject } from "@nestjs/common";
import { EmailTokenRepository } from "./email-token.repository";

const provider = "EmailTokenRepo"

export const EmailTokenRepo = Inject(provider)

export const EmailTokenProvide = {
    provide: provider,
    useClass: EmailTokenRepository,
}