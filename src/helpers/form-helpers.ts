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
        const nonDigitRegex = new RegExp("^[0-9]*$");
        const valueReplacedWithRegex = value.replace(nonDigitRegex, "");

        if (valueReplacedWithRegex.length === 0) {
            return true;
        } else {
            return false;
        }
    }
}
