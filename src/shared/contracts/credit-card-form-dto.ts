export interface CreditCardFormDto {
    [key: string]: string;
    creditCardNumber: string;
    expirationDate: string;
    cvv: string;
    zipCode: string;
}
