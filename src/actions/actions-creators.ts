import { Dispatcher } from "simplr-flux";

import { InputChangeAction } from "./actions";

export namespace FormActionsCreators {
    export function changeInputValue(inputId: string, newInputValue: string): void {
        Dispatcher.dispatch(new InputChangeAction(inputId, newInputValue));
    }
}
