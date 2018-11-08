import { Dictionary } from "../shared/contracts/dictionary";
import { CreditCardFormDto } from "../shared/contracts/credit-card-form-dto";

export namespace FormHelpers {
    export function areAllInputFieldsCorrect(fieldValidationStatus: Dictionary<boolean>, formObject: CreditCardFormDto): boolean {
        if (Object.keys(fieldValidationStatus).length !== Object.keys(formObject).length) {
            return false;
        }

        for (const key in fieldValidationStatus) {
            if (fieldValidationStatus.hasOwnProperty(key) && fieldValidationStatus[key] === false) {
                return false;
            }
        }

        return true;
    }
}
