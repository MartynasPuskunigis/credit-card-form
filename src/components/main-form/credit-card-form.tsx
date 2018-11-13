import * as React from "react";
import * as Cleave from "cleave.js/react";
import { CleaveOptions } from "cleave.js/options";

import { ZipCodeInput } from "../custom-inputs/zip-code-input";
import { ExpirationDateInput } from "../custom-inputs/expiration-date-input";
import { CreditCardNumberInput } from "../custom-inputs/credit-card-number-input";
import { FormValidators } from "../../validators/form-validators";
import { CreditCardFormDto } from "../../shared/contracts/credit-card-form-dto";

import "./credit-card-form.scss";

type Validation<TFields> = { [TKey in keyof TFields]: boolean };

const cvvCleaveOptions: CleaveOptions = {
    blocks: [3]
};

interface FormFields {
    creditCardNumber: string;
    expirationDate: string;
    cvv: string;
    zipCode: string;
}

interface State {
    formFields: CreditCardFormDto;
    invalidFields: Validation<CreditCardFormDto>;
    submitClicked: boolean;
    formInvalid: boolean;
}

export class CreditCardForm extends React.Component<{}, State> {
    public state: State = {
        invalidFields: {
            creditCardNumber: false,
            cvv: false,
            expirationDate: false,
            zipCode: false
        },
        formFields: {
            creditCardNumber: "",
            cvv: "",
            expirationDate: "",
            zipCode: ""
        },
        submitClicked: false,
        formInvalid: true
    };

    private onCreditCardSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!this.state.formInvalid) {
            console.info("Credit card info submitted:", this.state.formFields);
        } else {
            this.setState(state => {
                {
                    const nextState: State = {
                        ...state,
                        submitClicked: true
                    };
                    return CreditCardForm.calculateState(nextState);
                }
            });
        }
    };

    private static calculateState(state: State): State {
        const nextState: State = {
            ...state,
            invalidFields: {
                creditCardNumber: !FormValidators.creditCardNumber(state.formFields.creditCardNumber),
                expirationDate: !FormValidators.expirationDate(state.formFields.expirationDate),
                cvv: state.formFields.cvv.length < 3,
                zipCode: !FormValidators.zipCode(state.formFields.zipCode)
            },
            formFields: {
                creditCardNumber: state.formFields.creditCardNumber,
                expirationDate: state.formFields.expirationDate,
                cvv: state.formFields.cvv,
                zipCode: state.formFields.zipCode
            }
        };

        nextState.formInvalid = Object.keys(nextState.invalidFields)
            .map(x => nextState.invalidFields[x])
            .some(x => x);

        return nextState;
    }

    private onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = event.currentTarget.name;
        const fieldValue = event.currentTarget.value;

        this.setState(state => {
            state.formFields[fieldName] = fieldValue;
            return CreditCardForm.calculateState(state);
        });
    };

    private getFieldName(name: keyof FormFields): string {
        return name;
    }

    private renderErrorMessage(inputName: keyof FormFields, errorMessage: string): JSX.Element | null {
        if (this.state.invalidFields[inputName] != null && !this.state.invalidFields[inputName]) {
            return null;
        }

        return (
            <div className="error">
                <div className="fas fa-exclamation-triangle error-icon" />
                <div className="error-message">{errorMessage}</div>
            </div>
        );
    }

    private renderErrorList(): JSX.Element | null {
        if (!this.state.formInvalid || !this.state.submitClicked) {
            return null;
        }

        return (
            <div className="error-list">
                {this.renderErrorMessage("creditCardNumber", "Credit card number is not valid!")}
                {this.renderErrorMessage("expirationDate", "Expiration date is not valid!")}
                {this.renderErrorMessage("cvv", "CVV is not valid!")}
                {this.renderErrorMessage("zipCode", "Zip code is not valid!")}
            </div>
        );
    }

    public render(): JSX.Element {
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
                                <CreditCardNumberInput
                                    className="form-input"
                                    name={this.getFieldName("creditCardNumber")}
                                    onChange={this.onInputChange}
                                    value={this.state.formFields.creditCardNumber}
                                />
                            </div>
                            <div className="input-field">
                                <div className="input-label">
                                    <div className="far fa-calendar-alt form-field-icon" />
                                    <div>Expiration date</div>
                                </div>
                                <ExpirationDateInput
                                    className="form-input"
                                    name={this.getFieldName("expirationDate")}
                                    onChange={this.onInputChange}
                                    value={this.state.formFields.expirationDate}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field">
                                <div className="input-label">
                                    <div className="fas fa-lock form-field-icon" />
                                    <div>CVV</div>
                                </div>
                                <Cleave
                                    className="form-input"
                                    type="number"
                                    name={this.getFieldName("cvv")}
                                    placeholder="111"
                                    maxLength={4}
                                    onChange={this.onInputChange}
                                    value={this.state.formFields.cvv}
                                    options={cvvCleaveOptions}
                                />
                            </div>
                            <div className="input-field">
                                <div className="input-label">
                                    <div className="fas fa-map-marker-alt form-field-icon" />
                                    <div>Postal code</div>
                                </div>
                                <ZipCodeInput
                                    className="form-input"
                                    name={this.getFieldName("zipCode")}
                                    onChange={this.onInputChange}
                                    value={this.state.formFields.zipCode}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="buttons">
                        <input type="submit" value="Pay" disabled={this.state.submitClicked && this.state.formInvalid} />
                    </div>
                    {this.renderErrorList()}
                </form>
            </div>
        );
    }
}
