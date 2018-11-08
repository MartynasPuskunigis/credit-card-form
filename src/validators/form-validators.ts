import {
    CREDIT_CARD_NUMBER_INPUT_NAME,
    EXPIRATION_DATE_INPUT_NAME,
    CVV_INPUT_NAME,
    ZIP_CODE_INPUT_NAME
} from "../components/main-form/credit-card-form";

export namespace FormValidators {
    export function isInputValid(input: EventTarget & HTMLInputElement): boolean {
        switch (input.name) {
            case CREDIT_CARD_NUMBER_INPUT_NAME: {
                return isCreditCardNumberValid(input.value);
            }

            case EXPIRATION_DATE_INPUT_NAME: {
                return isExpirationDateValid(input.value);
            }

            case CVV_INPUT_NAME: {
                return !isValueOverMaxLength(input.value, input.maxLength) && !isValueBelowMinLength(input.value, input.minLength);
            }

            case ZIP_CODE_INPUT_NAME: {
                return isZipCodeValid(input.value);
            }

            default: {
                return false;
            }
        }
    }

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

    export function isExpirationDateValid(value: string): boolean {
        const creditCardNumberRegex = new RegExp("(0[1-9]|10|11|12)/[0-9]{2}$");
        if (creditCardNumberRegex.test(value)) {
            return true;
        } else {
            return false;
        }
    }
}
