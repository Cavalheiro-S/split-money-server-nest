import { Injectable } from "@nestjs/common";
import { TransactionDTO } from "../api/transaction.dto";

@Injectable()
export class TransactionMapper {
    toDTO(transaction: Object) {
        return {
            id: transaction["id"],
            value: transaction["amount"],
            description: transaction["title"],
            date: transaction["createdAt"],
            type: transaction["type"],
            category: transaction["category"],
            userId: transaction["userId"]
        } as TransactionDTO
    }
}