export namespace FormValidators {
    export function zipCode(value: string): boolean {
        const zipCodeRegex = new RegExp("^[0-9]{5}(?:-[0-9]{4})?$");

        return zipCodeRegex.test(value);
    }

    export function creditCardNumber(value: string): boolean {
        const cleanedValue = value.replace(/[^0-9]/gi, "");
        const creditCardNumberRegex = new RegExp(
            // tslint:disable-next-line:max-line-length
            "^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35d{3})d{11})$"
        );

        return creditCardNumberRegex.test(cleanedValue);
    }

    export function expirationDate(value: string): boolean {
        const creditCardNumberRegex = new RegExp("(0[1-9]|10|11|12)/[0-9]{2}$");

        return creditCardNumberRegex.test(value);
    }

    export function cvv(value: string): boolean {
        return value.length >= 3;
    }
}
