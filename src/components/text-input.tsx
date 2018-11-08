import * as React from "react";

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
    name: string;
    className?: string;
    minLength?: number;
    maxLength?: number;
    onlyNumbers?: boolean;
    placeholder?: string;
    defaultValue?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    creditCardNormalizer?: " " | "-";
    normalizeExpirationDate?: true;
    normalizePostalCode?: true;
}

interface State {
    value: string;
}

export class Input extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { value: props.defaultValue != null ? props.defaultValue : "" };
    }

    private normalizeOptions: NormalizeOptions = {
        creditCardNormalize: this.props.creditCardNormalizer,
        expirationDateNormalize: this.props.normalizeExpirationDate,
        postalCodeNormalize: this.props.normalizePostalCode
    };

    private onInputValueChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        const newValue = event.target.value;

        if (this.props.onChange != null) {
            this.props.onChange(event);
        }

        this.setState({ value: FormNormalizers.normalizeValue(newValue, this.normalizeOptions) });
    };

    public render(): JSX.Element {
        return (
            <input
                className={this.props.className}
                value={this.state.value}
                onChange={this.onInputValueChange}
                placeholder={this.props.placeholder}
                name={this.props.name}
                maxLength={this.props.maxLength}
                minLength={this.props.minLength}
                // onFocus={this.OnFocus}
                // onBlur={this.OnBlur}
            />
        );
    }
}
