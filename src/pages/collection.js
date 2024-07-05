import Page from "./page";

export default class CollectionPage extends Page {
  run() {
    const observer = new MutationObserver(() => {
      const libraryCards = document.getElementById('libraryCards');
      if (!libraryCards) return;

      // Skip updating if custom elements already exist.
      if (libraryCards.querySelector('.customSelect')) return;

      const typeSelect = document.createElement('select');
      typeSelect.classList.add('customSelect');
      ['hero', 'unit', 'spell', 'equip'].forEach(type => {
        const option = document.createElement('option');
        option.text = type;
        option.value = type;
        typeSelect.add(option);
      });

      libraryCards.querySelector('header .filters').prepend(typeSelect);
    });

    const wrapper = document.getElementById('wrapper');
    observer.observe(wrapper, { childList: true, subtree: true });
    this._observers.push(observer);
  }
}