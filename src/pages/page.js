export default class Page {
  _observers = [];

  run() {
    throw new Error('Page not implemented');
  }

  disconnect() {
    console.log('Page: disconnect()', this._observers);
    this._observers.forEach(o => o.disconnect());
  }
}