export interface EmailServiceInterface {
    sendEmail(email: string, content: string,subject: string): Promise<boolean>;
}