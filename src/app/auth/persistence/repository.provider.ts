import { Inject } from "@nestjs/common";
import { AuthRepository } from "./repository";

const provider = "AuthRepo"

export const AuthRepo = Inject(provider)

export const AuthRepositoryProvider = {
    provide: provider,
    useClass: AuthRepository
}
