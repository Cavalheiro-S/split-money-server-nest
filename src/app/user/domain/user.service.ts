import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/app/user/persitence/repository";
import { UserRepo } from "src/app/user/persitence/repository.provider";
import { CreateUserDTO } from "../api/create-user.dto";

@Injectable()
export class UserService {

    constructor(@UserRepo private readonly userRepository: UserRepository) { }

    async findUserById(userId: string){
        return this.userRepository.findUserById(userId);
    }

    async findOne(email: string) {
        return this.userRepository.findOne(email);
    }

    async create(dto: CreateUserDTO) {
        return this.userRepository.create(dto);
    }
}