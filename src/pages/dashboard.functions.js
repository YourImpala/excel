import {storage} from "@core/utils";

function toHTML(key) {
    const model = storage(key);
    const id = key.split(':')[1];
    const date = new Date(model.openedDate).toLocaleDateString();
    const time = new Date(model.openedDate).toLocaleTimeString();
    return `
        <li class="db__record">
            <a href="#excel/${id}">${model.title}</a>
            <strong>${date} ${time}</strong>
        </li>
    `;
}

function getAllKeys() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key.includes('excel')) {
            continue;
        }
        keys.push(key);
    }
    return keys;
}

export function createRecordsTable() {
    const keys = getAllKeys() || '';
    if (!keys.length) {
        return `<p>Записей нет</p>`;
    }
    return `
        <div class="db__list-header">
            <span>Название</span>
            <span>Дата Открытия</span>
        </div>

        <ul class="db__list">
            ${keys.map(toHTML).join('')}
        </ul>
    `;
}