import * as React from "react";

import { Input } from "../text-input";
import { FormHelpers } from "../../helpers/form-helpers";
import { Dictionary } from "../../shared/contracts/dictionary";
import { FormValidators } from "../../validators/form-validators";
import { CreditCardFormDto } from "../../shared/contracts/credit-card-form-dto";

import "./credit-card-form.scss";

export const CREDIT_CARD_NUMBER_INPUT_NAME = "CREDIT_CARD_NUMBER";
export const EXPIRATION_DATE_INPUT_NAME = "EXPIRATION_DATE";
export const CVV_INPUT_NAME = "CVV";
export const ZIP_CODE_INPUT_NAME = "ZIP_CODE";

interface State {
    creditCardNumberValue: string;
    expirationDateValue: string;
    cvvValue: string;
    zipCodeValue: string;
    fieldValidationStatus: Dictionary<boolean>;
    showErrorList: boolean;
}

export class CreditCardForm extends React.Component<{}, State> {
    public state: State = {
        fieldValidationStatus: {},
        creditCardNumberValue: "",
        cvvValue: "",
        expirationDateValue: "",
        zipCodeValue: "",
        showErrorList: false
    };

    private onCreditCardSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault();
        const creditCardFormObject: CreditCardFormDto = {
            creditCardNumberValue: this.state.creditCardNumberValue,
            cvvValue: this.state.cvvValue,
            expirationDateValue: this.state.expirationDateValue,
            zipCodeValue: this.state.zipCodeValue
        };

        if (FormHelpers.areAllInputFieldsCorrect(this.state.fieldValidationStatus, creditCardFormObject)) {
            console.info("Credit card info submitted:", creditCardFormObject);
        } else {
            this.setState({
                showErrorList: true,
                fieldValidationStatus: this.setUncheckedFieldsAsInvalid()
            });
        }
    };

    private setUncheckedFieldsAsInvalid(): Dictionary<boolean> {
        const newFieldValidationStatus = { ...this.state.fieldValidationStatus };
        const allFieldNames = [CREDIT_CARD_NUMBER_INPUT_NAME, EXPIRATION_DATE_INPUT_NAME, CVV_INPUT_NAME, ZIP_CODE_INPUT_NAME];

        for (const key of allFieldNames) {
            if (!newFieldValidationStatus.hasOwnProperty(key)) {
                newFieldValidationStatus[key] = false;
            }
        }

        return newFieldValidationStatus;
    }

    private onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isValid = FormValidators.isInputValid(event.target);
        const newValidationDictionary = this.state.fieldValidationStatus;
        newValidationDictionary[event.target.name] = isValid;

        const newState: State = {
            creditCardNumberValue:
                event.target.name === CREDIT_CARD_NUMBER_INPUT_NAME ? event.target.value : this.state.creditCardNumberValue,
            expirationDateValue: event.target.name === EXPIRATION_DATE_INPUT_NAME ? event.target.value : this.state.expirationDateValue,
            cvvValue: event.target.name === CVV_INPUT_NAME ? event.target.value : this.state.cvvValue,
            zipCodeValue: event.target.name === ZIP_CODE_INPUT_NAME ? event.target.value : this.state.zipCodeValue,
            fieldValidationStatus: newValidationDictionary,
            showErrorList: true
        };

        this.setState(newState);
    };

    private renderErrorMessage(inputName: string, errorMessage: string): JSX.Element | null {
        const incorrectInputIcon = <div className="fas fa-exclamation-triangle error-icon" />;
        if (!this.state.fieldValidationStatus[inputName] && this.state.fieldValidationStatus[inputName] != null) {
            return (
                <div className="error">
                    {incorrectInputIcon}
                    <div className="error-message">{errorMessage}</div>
                </div>
            );
        } else {
            return null;
        }
    }

    public render(): JSX.Element {
        const errorList = (
            <div className="error-list">
                {this.renderErrorMessage(CREDIT_CARD_NUMBER_INPUT_NAME, "Credit card number is not valid!")}
                {this.renderErrorMessage(EXPIRATION_DATE_INPUT_NAME, "Expiration date is not valid!")}
                {this.renderErrorMessage(CVV_INPUT_NAME, "CVV is not valid!")}
                {this.renderErrorMessage(ZIP_CODE_INPUT_NAME, "Zip code is not valid!")}
            </div>
        );

        return (
            <div className="credit-card-form">
                <div className="header">Card payment</div>
                <form className="form" onSubmit={this.onCreditCardSubmit}>
                    <div className="input-fields">
                        <div className="row">
                            <div className="input-field">
                                <div className="input-label">
                                    <div className="far fa-credit-card form-field-icon" />
                                    <div>Card number</div>
                                </div>
                                <Input
                                    className="form-input"
                                    name={CREDIT_CARD_NUMBER_INPUT_NAME}
                                    placeholder="1111 1111 1111 1111"
                                    onChange={this.onInputChange}
                                    creditCardNormalizer=" "
                                    maxLength={20}
                                />
                            </div>
                            <div className="input-field">
                                <div className="input-label">
                                    <div className="far fa-calendar-alt form-field-icon" />
                                    <div>Expiration date</div>
                                </div>
                                <Input
                                    className="form-input"
                                    name={EXPIRATION_DATE_INPUT_NAME}
                                    placeholder="MM/YY"
                                    maxLength={5}
                                    onChange={this.onInputChange}
                                    normalizeExpirationDate
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field">
                                <div className="input-label">
                                    <div className="fas fa-lock form-field-icon" />
                                    <div>CVV</div>
                                </div>
                                <Input
                                    className="form-input"
                                    name={CVV_INPUT_NAME}
                                    placeholder="111"
                                    maxLength={4}
                                    minLength={3}
                                    onChange={this.onInputChange}
                                />
                            </div>
                            <div className="input-field">
                                <div className="input-label">
                                    <div className="fas fa-map-marker-alt form-field-icon" />
                                    <div>Postal code</div>
                                </div>
                                <Input
                                    className="form-input"
                                    name={ZIP_CODE_INPUT_NAME}
                                    placeholder="11111"
                                    maxLength={10}
                                    onChange={this.onInputChange}
                                    normalizePostalCode
                                />
                            </div>
                        </div>
                    </div>
                    <div className="buttons">
                        <input type="submit" value="Pay" />
                    </div>
                    {this.state.showErrorList ? errorList : null}
                </form>
            </div>
        );
    }
}
