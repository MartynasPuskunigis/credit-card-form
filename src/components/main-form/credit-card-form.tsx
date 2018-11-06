import * as React from "react";

import { Input, InputValidator } from "../text-input";
import { FormStore } from "../../stores/form-store";

import "./credit-card-form.scss";

interface State {
    creditCardNumberInputTooLong: boolean;
    expirationDateInputTooShort: boolean;
}

export class CreditCardForm extends React.Component<{}, State> {
    public state: State = {
        creditCardNumberInputTooLong: false,
        expirationDateInputTooShort: false
    };

    private onSubmitClick: React.MouseEventHandler<HTMLFormElement> = event => {
        event.preventDefault();
        console.info(FormStore.toObject());
    };

    private onCreditCardNumberInputChange = (event: React.ChangeEvent<HTMLInputElement>, validator: InputValidator) => {
        this.setState({ creditCardNumberInputTooLong: validator.isOverMaxLength });
    };

    private onExpirationDateInputChange = (event: React.ChangeEvent<HTMLInputElement>, validator: InputValidator) => {
        this.setState({ expirationDateInputTooShort: validator.isBelowMinLength });
    };

    public render(): JSX.Element {
        return (
            <div className="credit-card-form">
                <div className="header">Card payment</div>
                <form className="form" onSubmit={this.onSubmitClick}>
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
                                    maxLength={8}
                                    onChange={this.onCreditCardNumberInputChange}
                                />
                                {this.state.creditCardNumberInputTooLong ? <div>Input too long</div> : null}
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
                                    minLength={4}
                                    onChange={this.onExpirationDateInputChange}
                                />
                                {this.state.expirationDateInputTooShort ? <div>Input too short</div> : null}
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field">
                                <div className="input-label">
                                    <div className="fas fa-lock form-field-icon" />
                                    <div>CVV</div>
                                </div>
                                <Input className="form-input" inputId="CVV" placeholder="111" />
                            </div>
                            <div className="input-field">
                                <div className="input-label">
                                    <div className="fas fa-map-marker-alt form-field-icon" />
                                    <div>Postal code</div>
                                </div>
                                <Input className="form-input" inputId="ZIP_CODE" placeholder="11111" />
                            </div>
                        </div>
                    </div>
                    <div className="buttons">
                        <input type="submit" value="Pay" />
                    </div>
                </form>
            </div>
        );
    }
}
