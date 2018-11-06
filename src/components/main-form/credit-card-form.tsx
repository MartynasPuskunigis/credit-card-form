import * as React from "react";

import "./credit-card-form.scss";

export class CreditCardForm extends React.Component {
    private onSubmitClick: React.MouseEventHandler<HTMLFormElement> = event => {
        event.preventDefault();
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
                                <input className="form-input" />
                            </div>
                            <div className="input-field">
                                <div className="input-label">
                                    <div className="far fa-calendar-alt form-field-icon" />
                                    <div>Expiration date</div>
                                </div>
                                <input className="form-input" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field">
                                <div className="input-label">
                                    <div className="fas fa-lock form-field-icon" />
                                    <div>CVV</div>
                                </div>
                                <input className="form-input" />
                            </div>
                            <div className="input-field">
                                <div className="input-label">
                                    <div className="fas fa-map-marker-alt form-field-icon" />
                                    <div>Postal code</div>
                                </div>
                                <input className="form-input" />
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
