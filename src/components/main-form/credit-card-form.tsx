import * as React from "react";

import { Form } from "../form";
import { Input, InputValidator } from "../text-input";
import { CreditCardFormDto } from "../../shared/contracts/form-dto";

import "./credit-card-form.scss";

interface State {
    isCreditCardNumberValid: boolean;
    isExpirationDateValid: boolean;
    isCvvValid: boolean;
    isZipCodeValid: boolean;
    creditCardNumberInputValue: string;
    expirationDateInputValue: string;
    cvvInputValue: string;
    zipCodeInputValue: string;
}

export class CreditCardForm extends React.Component<{}, State> {
    public state: State = {
        isCreditCardNumberValid: false,
        isExpirationDateValid: false,
        isZipCodeValid: false,
        isCvvValid: false,
        creditCardNumberInputValue: "",
        cvvInputValue: "",
        expirationDateInputValue: "",
        zipCodeInputValue: ""
    };

    private onCreditCardSubmit = (event: React.MouseEvent<HTMLFormElement>, formObject: CreditCardFormDto) => {
        // if (this.state.creditCardNumberValid === false && this.state.expirationDateInputTooShort === false) {
        //     console.info(formObject);
        // }
    };

    private onCreditCardNumberInputChange = (event: React.ChangeEvent<HTMLInputElement>, validator: InputValidator) => {
        this.setState({
            isCreditCardNumberValid: validator.isValidCreditCardNumber,
            creditCardNumberInputValue: event.target.value
        });
    };

    private onExpirationDateInputChange = (event: React.ChangeEvent<HTMLInputElement>, validator: InputValidator) => {
        this.setState({
            isExpirationDateValid: validator.isValidExpirationDate,
            expirationDateInputValue: event.target.value
        });
    };

    private onZipCodeInputChange = (event: React.ChangeEvent<HTMLInputElement>, validator: InputValidator) => {
        this.setState({
            isZipCodeValid: validator.isValidZipCode,
            zipCodeInputValue: event.target.value
        });
    };

    private onCvvInputChange = (event: React.ChangeEvent<HTMLInputElement>, validator: InputValidator) => {
        this.setState({
            isCvvValid: !validator.isBelowMinLength && !validator.isOverMaxLength,
            cvvInputValue: event.target.value
        });
    };

    private renderErrorMessage(errorMessage: string): JSX.Element {
        const incorrectInputIcon = <div className="fas fa-exclamation-triangle error-icon" />;

        return (
            <div className="error">
                {incorrectInputIcon}
                <div className="error-message">{errorMessage}</div>
            </div>
        );
    }

    public render(): JSX.Element {
        return (
            <div className="credit-card-form">
                <div className="header">Card payment</div>
                <Form className="form" onSubmit={this.onCreditCardSubmit}>
                    <div className="input-fields">
                        <div className="row">
                            <div className="input-field">
                                <div className="input-label">
                                    <div className="far fa-credit-card form-field-icon" />
                                    <div>Card number</div>
                                </div>
                                <Input
                                    className="form-input"
                                    inputId="CREDIT_CARD_NUMBER"
                                    placeholder="1111 1111 1111 1111"
                                    onChange={this.onCreditCardNumberInputChange}
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
                                    inputId="EXPIRATION_DATE"
                                    placeholder="MM/YY"
                                    maxLength={5}
                                    onChange={this.onExpirationDateInputChange}
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
                                    inputId="CVV"
                                    placeholder="111"
                                    minLength={3}
                                    maxLength={4}
                                    onChange={this.onCvvInputChange}
                                />
                            </div>
                            <div className="input-field">
                                <div className="input-label">
                                    <div className="fas fa-map-marker-alt form-field-icon" />
                                    <div>Postal code</div>
                                </div>
                                <Input
                                    className="form-input"
                                    inputId="ZIP_CODE"
                                    placeholder="11111"
                                    maxLength={10}
                                    onChange={this.onZipCodeInputChange}
                                    normalizePostalCode
                                />
                            </div>
                        </div>
                    </div>
                    <div className="buttons">
                        <input type="submit" value="Pay" />
                    </div>
                    <div className="error-list">
                        {!this.state.isCreditCardNumberValid && this.state.creditCardNumberInputValue.length !== 0
                            ? this.renderErrorMessage("Credit card number is not valid!")
                            : null}
                        {!this.state.isExpirationDateValid && this.state.expirationDateInputValue.length !== 0
                            ? this.renderErrorMessage("Expiration date is not valid!")
                            : null}
                        {!this.state.isCvvValid && this.state.cvvInputValue.length !== 0
                            ? this.renderErrorMessage("CVV is not valid!")
                            : null}
                        {!this.state.isZipCodeValid && this.state.zipCodeInputValue.length !== 0
                            ? this.renderErrorMessage("Zip code is not valid!")
                            : null}
                    </div>
                </Form>
            </div>
        );
    }
}
