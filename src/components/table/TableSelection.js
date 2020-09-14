export class TableSelection {
    static className = 'selected';

    constructor() {
        this.group = [];
        this.current = null;
    }

    select($el) {
        this.clear();
        $el.focus().addClass(TableSelection.className);
        this.group.push($el);
        this.current = $el;
    }
    selectGroup($group = []) {
        this.clear();
        this.group = $group;
        this.group.forEach($el => {
            $el.addClass(TableSelection.className);
            console.log($el);
        });
    }

    get selectedIds() {
        return this.group.map($el => $el.id());
    }

    applyStyle(style) {
        this.group.forEach($el => {
            $el.css(style);
        });
    }

    clear() {
        this.group
            .forEach($cell => $cell.removeClass(TableSelection.className));
        this.group = [];
    }
}