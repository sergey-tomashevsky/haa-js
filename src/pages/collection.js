import Page from "./page";

export default class CollectionPage extends Page {
  run() {
    const observer = new MutationObserver(() => {
      const libraryCards = document.getElementById('libraryCards');
      if (!libraryCards) return;

      // Skip updating if custom elements already exist.
      if (libraryCards.querySelector('.customElement')) return;

      const newButton = document.createElement('div');
      newButton.classList.add('button');
      newButton.classList.add('customElement');
      newButton.innerText = 'New custom button';
      libraryCards.querySelector('header .filters').prepend(newButton);
    });

    const wrapper = document.getElementById('wrapper');
    observer.observe(wrapper, { childList: true, subtree: true });
    this._observers.push(observer);
  }
}