import Page from "./page";

const TYPE_OPTIONS = [
  { text: 'placeholder', value: '' },
  { text: 'hero', value: 'hero' },
  { text: 'unit', value: 'unit' },
  { text: 'spell', value: 'spell' },
  { text: 'companion', value: 'equip' },
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
    });

    const wrapper = document.getElementById('wrapper');
    observer.observe(wrapper, { childList: true, subtree: true });
    this._observers.push(observer);
  }
}