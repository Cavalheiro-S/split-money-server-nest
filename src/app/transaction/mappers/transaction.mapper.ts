import { Injectable } from "@nestjs/common";
import { TransactionDTO } from "../api/transaction.dto";

@Injectable()
export class TransactionMapper {
    toDTO(transaction: Object) {
        return {
            id: transaction["id"],
            amount: transaction["amount"],
            description: transaction["description"],
            date: transaction["createdAt"],
            type: transaction["type"],
            category: transaction["category"],
            userId: transaction["userId"]
        } as TransactionDTO
    }
}