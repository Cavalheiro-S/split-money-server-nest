
import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { EmailServiceInterface } from "./interface/email.service.interface";

@Injectable()
export class EmailService implements EmailServiceInterface {

    async sendEmail(email: string, content: string, subject: string) {
        try {

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });
            const result = await transporter.sendMail({
                from: `"Split Money" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: subject,
                html: content
            })

            return !!result
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }

            return false
        }
    }
}