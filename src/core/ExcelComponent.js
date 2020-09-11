import {DOMListener} from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubscribers = [];

    this.prepare();
  }
  prepare() {}

  toHTML() {
    return '';
  }

  init() {
    this.initDOMListeners();
  }

  $emit(event, ...args) {
    const unsub = this.emitter.emit(event, ...args);
    this.unsubscribers.push(unsub);
  }

  $on(event, fn) {
    this.emitter.subscribe(event, fn);
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach(unsub => unsub());
  }
}