import * as React from "react";

import { FormActionsCreators } from "../actions/actions-creators";
import { FormHelpers } from "../helpers/form-helpers";
import { FormNormalizers } from "../normalizers/form-normalizers";
import { NormalizeOptions } from "../normalizers/normalize-options";

export interface InputValidator {
    isOverMaxLength: boolean;
    isBelowMinLength: boolean;
    isValidZipCode: boolean;
    isValidCreditCardNumber: boolean;
    isValidExpirationDate: boolean;
}

interface Props {
    inputId: string;
    className: string;
    minLength?: number;
    maxLength?: number;
    onlyNumbers?: boolean;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, validator: InputValidator) => void;
    creditCardNormalizer?: " " | "-";
    normalizeExpirationDate?: true;
    normalizePostalCode?: true;
}

interface State {
    value: string;
}

export class Input extends React.Component<Props, State> {
    public state: State = {
        value: ""
    };

    private normalizeOptions: NormalizeOptions = {
        creditCardNormalize: this.props.creditCardNormalizer,
        expirationDateNormalize: this.props.normalizeExpirationDate,
        postalCodeNormalize: this.props.normalizePostalCode
    };

    // public static getStores(): Container.StoresList {
    //     return [FormStore];
    // }

    // public static calculateState(state: State, props: Props): State {
    //     const { zipCodeValue, cvvValue, expirationDateValue, creditCardNumberValue } = FormStore.getState();

    //     switch (props.inputId) {
    //         case "CREDIT_CARD_NUMBER": {
    //             return {
    //                 value: creditCardNumberValue
    //             };
    //         }

    //         case "EXPIRATION_DATE": {
    //             return {
    //                 value: expirationDateValue
    //             };
    //         }

    //         case "CVV": {
    //             return {
    //                 value: cvvValue
    //             };
    //         }

    //         case "ZIP_CODE": {
    //             return {
    //                 value: zipCodeValue
    //             };
    //         }

    //         default: {
    //             return { value: "" };
    //         }
    //     }
    // }

    private getValidator(newValue: string): InputValidator {
        return {
            isBelowMinLength: this.props.minLength != null ? !FormHelpers.isMinLength(newValue, this.props.minLength) : true,
            isOverMaxLength: this.props.maxLength != null ? !FormHelpers.isMaxLength(newValue, this.props.maxLength) : true,
            isValidZipCode: FormHelpers.isValidZipCode(newValue),
            isValidCreditCardNumber: FormHelpers.isValidCreditCardNumber(newValue),
            isValidExpirationDate: FormHelpers.isValidExpirationDate(newValue)
        };
    }

    private onInputValueChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        let newValue = event.target.value;
        if (this.props.creditCardNormalizer != null) {
            newValue = event.target.value.replace(/\s+/g, "");
        }

        const validator = this.getValidator(newValue);

        if (this.props.onChange != null) {
            this.props.onChange(event, validator);
        }

        FormActionsCreators.changeInputValue(this.props.inputId, newValue);

        this.setState({ value: FormNormalizers.normalizeValue(newValue, this.normalizeOptions) });
        // if (this.props.creditCardNormalizer != null) {
        //     const normalizedValue = FormNormalizers.normalizeCreditCardNumber(newValue, " ");
        //     this.setState({ value: normalizedValue });
        // } else {
        //     this.setState({ value: newValue });
        // }
    };

    public render(): JSX.Element {
        return (
            <input
                className={this.props.className}
                value={this.state.value}
                onChange={this.onInputValueChange}
                placeholder={this.props.placeholder}
                name={this.props.inputId}
                maxLength={this.props.maxLength}
                // onFocus={this.OnFocus}
                // onBlur={this.OnBlur}
            />
        );
    }
}

// export const Input = Container.create(InputContainerClass, { withProps: true });
