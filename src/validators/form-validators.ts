export namespace FormValidators {
    export function isValueBelowMinLength(value: string, minLength: number): boolean {
        return value.length < minLength;
    }

    export function isValueOverMaxLength(value: string, maxLength: number): boolean {
        return value.length > maxLength;
    }

    export function isZipCodeValid(value: string): boolean {
        const zipCodeRegex = new RegExp("^[0-9]{5}(?:-[0-9]{4})?$");
        if (zipCodeRegex.test(value)) {
            return true;
        } else {
            return false;
        }
    }

    export function isCreditCardNumberValid(value: string): boolean {
        const cleanedValue = value.replace(/[^0-9]/gi, "");
        const creditCardNumberRegex = new RegExp(
            // tslint:disable-next-line:max-line-length
            "^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35d{3})d{11})$"
        );
        if (creditCardNumberRegex.test(cleanedValue)) {
            console.log("true");
            return true;
        } else {
            console.log("false");
            return false;
        }
    }

    export function isExpirationDateValid(value: string): boolean {
        const creditCardNumberRegex = new RegExp("(0[1-9]|10|11|12)/[0-9]{2}$");
        if (creditCardNumberRegex.test(value)) {
            return true;
        } else {
            return false;
        }
    }

    export function isCvvValid(value: string): boolean {
        return !isValueBelowMinLength(value, 3) && !isValueOverMaxLength(value, 4);
    }
}
