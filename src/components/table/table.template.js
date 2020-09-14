import {toInlineStyles} from "@core/utils";
import {defaultStyles} from "@/constants";
import {parse} from "@core/parse";


const CODES = {
    A: 65,
    Z: 90,
}
const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

export function createTable(rowsCount = 15, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(withWidthFrom(state))
        .map(toColumn)
        .join('');

    rows.push(createRow(null, cols, {}));

    for (let row = 0; row < rowsCount; row += 1) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(state, row))
            .join('')

        rows.push(createRow(row + 1, cells, state.rowState));
    }

    return rows.join('');
}

function createRow(index, content, state) {
    const resize = index
        ? '<div class="row-resize" data-resize="row"></div>'
        : '';
    const height = getHeight(state, index);
    return `
        <div class="row" data-type="resizable" data-row="${index}" style="height: ${height};">
            <div class="row-info">
                ${index ? index : ''}
                ${resize}
            </div>        
            <div class="row-data">${content}</div>        
        </div>
    `;
}

function toColumn({colName, index, width}) {
    return `<div class="column" data-type="resizable" data-col="${index}" style="width:${width};">
                ${colName}
                <div class="col-resize" data-resize="col"></div>
            </div>`;
}

function toCell(state, rowIndex) {
    return function(_, colIndex) {
        const id = `${rowIndex}:${colIndex}`;
        const width = getWidth(state.colState, colIndex);
        const data = state.dataState[id];
        const styles = toInlineStyles({
            ...defaultStyles,
            ...state.stylesState[id],
        });
        return `
        <div 
            class="cell" 
            contenteditable 
            data-col="${colIndex}" 
            data-type="cell"
            data-id="${id}"
            data-value="${data || ''}"
            style="${styles}; width: ${width}"
         >${parse(data) || ''}</div>
    `;
    }
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}
function withWidthFrom(state) {
    return function(colName, index) {
        return {
            colName,
            index,
            width: getWidth(state.colState, index),
        }
    }
}

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT) + 'px';
}