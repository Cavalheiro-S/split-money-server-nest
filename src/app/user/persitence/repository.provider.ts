import { Inject } from "@nestjs/common";
import { UserRepository } from "./repository";

const provider = "UserRepo"

export const UserRepo = Inject(provider)

export const UserRepositoryProvider = {
    provide: provider,
    useClass: UserRepository,
}