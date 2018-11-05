import * as React from "react";
import * as ReactDOM from "react-dom";
import { ToastContainer, toast } from "react-toastify";

import { AppRouter } from "./router/router";
import { ModalContainer } from "./containers/modal-container";
import { TimerActionsCreators } from "./actions/actions-creators";

import "react-toastify/dist/ReactToastify.min.css";
import "@fortawesome/fontawesome-pro/css/all.css";
import "./shared/styles/main.scss";

class App extends React.Component {
    public componentDidMount(): void {
        TimerActionsCreators.loadUsersFromLocalStorage();
    }

    public render(): JSX.Element {
        return (
            <div className="app">
                <AppRouter />
                <ToastContainer position={toast.POSITION.TOP_RIGHT} />
                <ModalContainer />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
