import { Inject } from "@nestjs/common";
import { TransactionRepository } from "./repository";

const provider = "TransactionRepo"

export const TransactionRepo = Inject(provider)

export const TransactionRepositoryProvide = {
    provide: provider,
    useClass: TransactionRepository,
}