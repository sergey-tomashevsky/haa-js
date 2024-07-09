import Page from "./page";

const TYPE_OPTIONS = [
  { text: 'Type', value: '' },
  { text: 'Hero', value: 'hero' },
  { text: 'Unit', value: 'unit' },
  { text: 'Spell', value: 'spell' },
  { text: 'Companion', value: 'equip' },
]

export default class CollectionPage extends Page {
  run() {
    const observer = new MutationObserver(() => {
      const libraryCards = document.getElementById('libraryCards');
      if (!libraryCards) return;

      // Skip updating if custom elements already exist.
      if (libraryCards.querySelector('.customSelect')) return;

      const typeSelect = document.createElement('select');
      typeSelect.classList.add('customSelect');
      TYPE_OPTIONS.forEach((optionParams) => {
        const option = document.createElement('option');
        option.text = optionParams.text;
        option.value = optionParams.value;
        typeSelect.add(option);
      });

      libraryCards.querySelector('header .filters').prepend(typeSelect);

      document.querySelectorAll('#libraryCards .card').forEach(card => {
        card.classList.add('visible');
      });
    });

    const wrapper = document.getElementById('wrapper');
    observer.observe(wrapper, { childList: true, subtree: true });
    this._observers.push(observer);
  }
}