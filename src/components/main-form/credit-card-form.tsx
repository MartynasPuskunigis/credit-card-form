import * as React from "react";
import * as Cleave from "cleave.js/react";
import { CleaveOptions } from "cleave.js/options";
import classNames from "classnames";

import { ZipCodeInput } from "../custom-inputs/zip-code-input";
import { ExpirationDateInput } from "../custom-inputs/expiration-date-input";
import { CreditCardNumberInput } from "../custom-inputs/credit-card-number-input";
import { FormValidators } from "../../validators/form-validators";
import { CreditCardFormDto } from "../../shared/contracts/credit-card-form-dto";

import "./credit-card-form.scss";

type Dictionary<TFields, TValue> = { [TKey in keyof TFields]: TValue };

const cvvCleaveOptions: CleaveOptions = {
    blocks: [4]
};

interface FormFields {
    creditCardNumber: string;
    expirationDate: string;
    cvv: string;
    zipCode: string;
}

interface State {
    formFields: CreditCardFormDto;
    validFields: Dictionary<CreditCardFormDto, boolean>;
    focusedField: string | undefined;
    submitClicked: boolean;
    formValid: boolean;
}

export class CreditCardForm extends React.Component<{}, State> {
    public state: State = {
        validFields: {
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
        focusedField: undefined,
        submitClicked: false,
        formValid: false
    };

    private onCreditCardSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (this.state.formValid) {
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

    private onInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        const fieldName = event.currentTarget.name;

        this.setState(state => {
            const nextState: State = {
                ...state,
                focusedField: fieldName
            };
            return nextState;
        });
    };

    private onInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        this.setState(state => {
            const nextState: State = {
                ...state,
                focusedField: undefined
            };
            return nextState;
        });
    };

    private static calculateState(state: State): State {
        const nextState: State = {
            ...state,
            validFields: {
                creditCardNumber: FormValidators.creditCardNumber(state.formFields.creditCardNumber),
                expirationDate: FormValidators.expirationDate(state.formFields.expirationDate),
                cvv: FormValidators.cvv(state.formFields.cvv),
                zipCode: FormValidators.zipCode(state.formFields.zipCode)
            }
        };

        nextState.formValid = Object.keys(nextState.validFields)
            .map(x => nextState.validFields[x])
            .every(x => x);

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
        if (this.state.validFields[inputName] != null && this.state.validFields[inputName]) {
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
        if (this.state.formValid || !this.state.submitClicked) {
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
                                    <div
                                        className={classNames("text", {
                                            focused: this.state.focusedField === this.getFieldName("creditCardNumber"),
                                            incorrect: !this.state.validFields.creditCardNumber && this.state.submitClicked
                                        })}
                                    >
                                        Card number
                                    </div>
                                </div>
                                <CreditCardNumberInput
                                    className={classNames("form-input", {
                                        incorrect: !this.state.validFields.creditCardNumber && this.state.submitClicked
                                    })}
                                    name={this.getFieldName("creditCardNumber")}
                                    onChange={this.onInputChange}
                                    value={this.state.formFields.creditCardNumber}
                                    onFocus={this.onInputFocus}
                                    onBlur={this.onInputBlur}
                                />
                            </div>
                            <div className="input-field">
                                <div className="input-label">
                                    <div className="far fa-calendar-alt form-field-icon" />
                                    <div
                                        className={classNames("text", {
                                            focused: this.state.focusedField === this.getFieldName("expirationDate"),
                                            incorrect: !this.state.validFields.expirationDate && this.state.submitClicked
                                        })}
                                    >
                                        Expiration date
                                    </div>
                                </div>
                                <ExpirationDateInput
                                    className={classNames("form-input", {
                                        incorrect: !this.state.validFields.expirationDate && this.state.submitClicked
                                    })}
                                    name={this.getFieldName("expirationDate")}
                                    onChange={this.onInputChange}
                                    value={this.state.formFields.expirationDate}
                                    onFocus={this.onInputFocus}
                                    onBlur={this.onInputBlur}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field">
                                <div className="input-label">
                                    <div className="fas fa-lock form-field-icon" />
                                    <div
                                        className={classNames("text", {
                                            focused: this.state.focusedField === this.getFieldName("cvv"),
                                            incorrect: !this.state.validFields.cvv && this.state.submitClicked
                                        })}
                                    >
                                        CVV
                                    </div>
                                </div>
                                <Cleave
                                    className={classNames("form-input", {
                                        incorrect: !this.state.validFields.cvv && this.state.submitClicked
                                    })}
                                    type="number"
                                    name={this.getFieldName("cvv")}
                                    placeholder="111"
                                    maxLength={4}
                                    onChange={this.onInputChange}
                                    value={this.state.formFields.cvv}
                                    onFocus={this.onInputFocus}
                                    onBlur={this.onInputBlur}
                                    options={cvvCleaveOptions}
                                    autoComplete="off"
                                />
                            </div>
                            <div className="input-field">
                                <div className="input-label">
                                    <div className="fas fa-map-marker-alt form-field-icon" />
                                    <div
                                        className={classNames("text", {
                                            focused: this.state.focusedField === this.getFieldName("zipCode"),
                                            incorrect: !this.state.validFields.zipCode && this.state.submitClicked
                                        })}
                                    >
                                        Postal code
                                    </div>
                                </div>
                                <ZipCodeInput
                                    className={classNames("form-input", {
                                        incorrect: !this.state.validFields.zipCode && this.state.submitClicked
                                    })}
                                    name={this.getFieldName("zipCode")}
                                    onChange={this.onInputChange}
                                    value={this.state.formFields.zipCode}
                                    onFocus={this.onInputFocus}
                                    onBlur={this.onInputBlur}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="buttons">
                        <input type="submit" value="Pay" disabled={this.state.submitClicked && !this.state.formValid} />
                    </div>
                    {this.renderErrorList()}
                </form>
            </div>
        );
    }
}
