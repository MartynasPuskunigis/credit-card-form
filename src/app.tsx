import * as React from "react";
import * as ReactDOM from "react-dom";

import { CreditCardForm } from "./components/main-form/credit-card-form";

import "@fortawesome/fontawesome-pro/css/all.css";
import "./shared/styles/main.scss";

class App extends React.Component {
    public render(): JSX.Element {
        return (
            <div className="app">
                <CreditCardForm />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
