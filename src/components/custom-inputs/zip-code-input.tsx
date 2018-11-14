import * as React from "react";
import * as Cleave from "cleave.js/react";
import { CleaveOptions } from "cleave.js/options";

interface Props {
    name: string;
    className?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    defaultValue?: string;
    value: string;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const zipCodeCleaveOptions: CleaveOptions = {
    numericOnly: true,
    blocks: [5]
};

export class ZipCodeInput extends React.Component<Props> {
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

    private onInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        if (this.props.onFocus == null) {
            return;
        }

        event.persist();
        this.props.onFocus(event);
    };

    private onInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (this.props.onBlur == null) {
            return;
        }

        event.persist();
        this.props.onBlur(event);
    };

    public render(): JSX.Element {
        return (
            <Cleave
                className={this.props.className}
                value={this.props.value}
                onChange={this.onInputValueChange}
                placeholder="11111"
                name={this.props.name}
                options={zipCodeCleaveOptions}
                autoComplete="off"
                onFocus={this.onInputFocus}
                onBlur={this.onInputBlur}
            />
        );
    }
}
