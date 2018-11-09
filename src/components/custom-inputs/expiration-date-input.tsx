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
    date: true,
    datePattern: ["m", "y"]
};

export class ExpirationDateInput extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.state = { value: props.defaultValue != null ? props.defaultValue : "" };
    }

    private onInputValueChange: React.ChangeEventHandler<HTMLInputElement> = event => {
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
                placeholder="MM/YY"
                name={this.props.name}
                options={cleaveOptions}
            />
        );
    }
}
