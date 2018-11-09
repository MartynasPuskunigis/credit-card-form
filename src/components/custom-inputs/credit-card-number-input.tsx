import * as React from "react";
import * as Cleave from "cleave.js/react";
import { CleaveOptions } from "cleave.js/options";

interface Props {
    name: string;
    className?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    defaultValue?: string;
    value: string;
}

const cleaveOptions: CleaveOptions = {
    creditCard: true
};

export class CreditCardNumberInput extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.state = { value: props.defaultValue != null ? props.defaultValue : "" };
    }

    private onInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (this.props.onChange != null) {
            event.persist();
            this.props.onChange(event);
        }
    };

    public render(): JSX.Element {
        return (
            <Cleave
                className={this.props.className}
                value={this.props.value}
                onChange={this.onInputValueChange}
                placeholder="1111 1111 1111 1111"
                name={this.props.name}
                options={cleaveOptions}
            />
        );
    }
}
