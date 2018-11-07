export namespace FormHelpers {
    export function isMinLength(value: string, minLength: number): boolean {
        if (value.length < minLength) {
            return false;
        } else {
            return true;
        }
    }

    export function isMaxLength(value: string, maxLength: number): boolean {
        if (value.length > maxLength) {
            return false;
        } else {
            return true;
        }
    }

    export function isOnlyNumbers(value: string): boolean {
        const digitRegex = new RegExp("^[0-9]*$");

        if (digitRegex.test(value)) {
            return true;
        } else {
            return false;
        }
    }

    export function isValidZipCode(value: string): boolean {
        const zipCodeRegex = new RegExp("^[0-9]{5}(?:-[0-9]{4})?$");
        if (zipCodeRegex.test(value)) {
            return true;
        } else {
            return false;
        }
    }

    export function isValidCreditCardNumber(value: string): boolean {
        const creditCardNumberRegex = new RegExp(
            // tslint:disable-next-line:max-line-length
            "^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35d{3})d{11})$"
        );
        if (creditCardNumberRegex.test(value)) {
            return true;
        } else {
            return false;
        }
    }

    export function isValidExpirationDate(value: string): boolean {
        const creditCardNumberRegex = new RegExp("(0[1-9]|10|11|12)/[0-9]{2}$");
        if (creditCardNumberRegex.test(value)) {
            return true;
        } else {
            return false;
        }
    }
}
