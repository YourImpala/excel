import {ExcelComponent} from "@core/ExcelComponent";

export class ExcelStateComponent extends ExcelComponent {
    constructor(...args) {
        super(...args);
    }

    initState(initialState = {}) {
        this.state = {...initialState};
    }

    setState(newState) {
        this.state = {...this.state, ...newState};
        this.$root.html(this.template);
    }

    get template() {
        return JSON.stringify(this.satate, null, 4);
    }
}