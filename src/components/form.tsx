import * as React from "react";
import { Container } from "flux/utils";

import { FormStore } from "../stores/form-store";
import { CreditCardFormDto } from "../shared/contracts/form-dto";

interface Props {
    className: string;
    onSubmit?: (event: React.MouseEvent<HTMLFormElement>, formObject: CreditCardFormDto) => void;
}

interface State {
    formObject: CreditCardFormDto;
}

export class FormContainerClass extends React.Component<Props, State> {
    public static getStores(): Container.StoresList {
        return [FormStore];
    }

    public static calculateState(state: State): State {
        const formObject = FormStore.toObject();

        return {
            ...state,
            formObject: formObject
        };
    }

    private onFormSubmit: React.MouseEventHandler<HTMLFormElement> = event => {
        event.preventDefault();
        if (this.props.onSubmit != null) {
            this.props.onSubmit(event, this.state.formObject);
        }
    };

    public render(): JSX.Element {
        return (
            <form className={this.props.className} onSubmit={this.onFormSubmit}>
                {this.props.children}
            </form>
        );
    }
}

export const Form = Container.create(FormContainerClass, { withProps: true });
