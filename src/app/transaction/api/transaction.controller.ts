import { Controller, Get, Injectable } from "@nestjs/common";


@Controller("transaction")
export class TransactionController{


    @Get()
    getTransaction(){
        return 'Hello World';
    }
}