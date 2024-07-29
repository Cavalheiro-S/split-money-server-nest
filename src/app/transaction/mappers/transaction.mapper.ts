import { Injectable } from "@nestjs/common";
import { TransactionDTO } from "../api/transaction.dto";

@Injectable()
export class TransactionMapper {
    toDTO(transaction: Object) {
        return {
            id: transaction["id"],
            amount: transaction["amount"],
            description: transaction["description"],
            date: transaction["date"],
            type: transaction["type"],
            category: transaction["category"],
            recurrent: !!transaction["parentId"],
            userId: transaction["userId"],
            hasChildren: transaction["children"].length > 0
        } as TransactionDTO
    }
}