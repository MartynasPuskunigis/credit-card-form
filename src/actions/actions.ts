export class InputChangeAction {
    constructor(private inputId: string, private newInputValue: string) {}

    public get getInputId(): string {
        return this.inputId;
    }

    public get getNewInputValue(): string {
        return this.newInputValue;
    }
}
