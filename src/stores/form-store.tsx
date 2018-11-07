import { ReduceStore } from "simplr-flux";

import { CreditCardFormDto } from "../shared/contracts/form-dto";
import { InputChangeAction } from "../actions/actions";

interface StoreState extends CreditCardFormDto {
    disabled: boolean;
}

class FormReduceStoreClass extends ReduceStore<StoreState> {
    constructor() {
        super();
        this.registerAction(InputChangeAction, this.onInputValueChange.bind(this));
    }

    public getInitialState(): StoreState {
        return {
            creditCardNumberValue: "",
            cvvValue: "",
            expirationDateValue: "",
            zipCodeValue: "",
            disabled: false
        };
    }

    public toObject(): CreditCardFormDto {
        const state = this.getState();

        return {
            creditCardNumberValue: state.creditCardNumberValue,
            cvvValue: state.cvvValue,
            expirationDateValue: state.expirationDateValue,
            zipCodeValue: state.zipCodeValue
        };
    }

    private onInputValueChange(action: InputChangeAction, state: StoreState): StoreState {
        switch (action.getInputId) {
            case "CREDIT_CARD_NUMBER": {
                return {
                    ...state,
                    creditCardNumberValue: action.getNewInputValue
                };
            }

            case "EXPIRATION_DATE": {
                return {
                    ...state,
                    expirationDateValue: action.getNewInputValue
                };
            }

            case "CVV": {
                return {
                    ...state,
                    cvvValue: action.getNewInputValue
                };
            }

            case "ZIP_CODE": {
                return {
                    ...state,
                    zipCodeValue: action.getNewInputValue
                };
            }

            default: {
                return { ...state };
            }
        }
    }
}

export const FormStore = new FormReduceStoreClass();
