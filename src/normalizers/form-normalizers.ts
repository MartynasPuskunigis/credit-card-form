import { NormalizeOptions } from "./normalize-options";

export namespace FormNormalizers {
    export function normalizeValue(value: string, options: NormalizeOptions): string {
        if (options.creditCardNormalize != null) {
            return normalizeCreditCardNumber(value, options.creditCardNormalize);
        } else if (options.expirationDateNormalize != null) {
            return normalizeExpirationDate(value);
        } else if (options.postalCodeNormalize != null) {
            return normalizePostalCode(value);
        } else {
            return value;
        }
    }

    export function normalizeCreditCardNumber(value: string, separator: " " | "-"): string {
        const cleanValue = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        const matches = cleanValue.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || "";
        const parts = [];
        for (let i = 0, length = match.length; i < length; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(" ");
        } else {
            return value;
        }
    }

    export function normalizeExpirationDate(value: string): string {
        return value
            .replace(
                /^([1-9]\/|[2-9])$/g,
                "0$1/" // To handle 3/ > 03/
            )
            .replace(
                /^(0[1-9]{1}|1[0-2]{1})$/g,
                "$1/" // 11 > 11/
            )
            .replace(
                /^([0-1]{1})([3-9]{1})$/g,
                "0$1/$2" // 13 > 01/3
            )
            .replace(
                /^(\d)\/(\d\d)$/g,
                "0$1/$2" // To handle 1/11 > 01/11
            )
            .replace(
                /^(0?[1-9]{1}|1[0-2]{1})([0-9]{2})$/g,
                "$1/$2" // 141 > 01/41
            )
            .replace(
                /^([0]{1,})\/|[0]{1,}$/g,
                "0" // To handle 0/ > 0 and 00 > 0
            )
            .replace(
                /[^\d\/]|^[\/]{0,}$/g,
                "" // To allow only numbers and /
            )
            .replace(
                /\/\//g,
                "/" // Prevent entering more than 1 /
            );
    }

    export function normalizePostalCode(value: string): string {
        if (!value.includes("-") && value.length === 6) {
            return `${value.substring(0, 5)}-${value[5]}`;
        }

        return value;
    }
}
