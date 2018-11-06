import * as React from "react";
import { Container } from "flux/utils";

import { FormStore } from "../stores/form-store";
import { FormActionsCreators } from "../actions/actions-creators";
import { FormHelpers } from "../helpers/form-helpers";

export interface InputValidator {
    isOverMaxLength: boolean;
    isBelowMinLength: boolean;
    isOnlyNumbers?: boolean;
}

interface Props {
    inputId: string;
    className: string;
    minLength?: number;
    maxLength?: number;
    onlyNumbers?: boolean;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, validator: InputValidator) => void;
}

interface State {
    value: string;
}

export class InputContainerClass extends React.Component<Props, State> {
    public static getStores(): Container.StoresList {
        return [FormStore];
    }

    public static calculateState(state: State, props: Props): State {
        const { zipCodeValue, cvvValue, expirationDateValue, creditCardNumberValue } = FormStore.getState();

        switch (props.inputId) {
            case "CREDIT_CARD_NUMBER": {
                return {
                    value: creditCardNumberValue
                };
            }

            case "EXPIRATION_DATE": {
                return {
                    value: expirationDateValue
                };
            }

            case "CVV": {
                return {
                    value: cvvValue
                };
            }

            case "ZIP_CODE": {
                return {
                    value: zipCodeValue
                };
            }

            default: {
                return { value: "" };
            }
        }
    }

    private getValidator(newValue: string): InputValidator {
        return {
            isBelowMinLength: this.props.minLength != null ? !FormHelpers.isMinLength(newValue, this.props.minLength) : true,
            isOverMaxLength: this.props.maxLength != null ? !FormHelpers.isMaxLength(newValue, this.props.maxLength) : true,
            isOnlyNumbers: this.props.onlyNumbers != null ? FormHelpers.isOnlyNumbers(newValue) : undefined
        };
    }

    private onInputValueChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        const newValue = event.target.value;
        const validator = this.getValidator(newValue);

        if (this.props.onChange != null) {
            this.props.onChange(event, validator);
        }

        FormActionsCreators.changeInputValue(this.props.inputId, newValue);
    };

    public render(): JSX.Element {
        return (
            <input
                className={this.props.className}
                value={this.state.value}
                onChange={this.onInputValueChange}
                placeholder={this.props.placeholder}
                name={this.props.inputId}
                // ref={this.SetElementRef}
                // disabled={this.Disabled}
                // onFocus={this.OnFocus}
                // onBlur={this.OnBlur}
            />
        );
    }
}

export const Input = Container.create(InputContainerClass, { withProps: true });
