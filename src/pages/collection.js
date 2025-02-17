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

      addCustomTypeNav();

      // Skip updating if custom elements already exist.
      if (libraryCards.querySelector('.customSelect')) return;

      document.querySelectorAll('#libraryCards .card').forEach(card => {
        card.classList.add('visible');
      });
      return;

      // TODO: filters temporary disabled until fixed.

      const typeSelect = document.createElement('select');
      typeSelect.classList.add('customSelect');
      TYPE_OPTIONS.forEach((optionParams) => {
        const option = document.createElement('option');
        option.text = optionParams.text;
        option.value = optionParams.value;
        typeSelect.add(option);
      });
      typeSelect.addEventListener('change', (event) => {
        console.log('Type select change', event);
        applyTypeFilter(event.target.value);
      })

      libraryCards.querySelector('header .filters').prepend(typeSelect);

      applyTypeFilter(document.currentTypeFilter || '');
    });

    const wrapper = document.getElementById('wrapper');
    observer.observe(wrapper, { childList: true, subtree: true });
    this._observers.push(observer);
  }
}

function addCustomTypeNav() {
  const cardListContainer = document.getElementById('card-list-container');
  if (cardListContainer.querySelector('.mainCardsNav')) return;

  const cardListHeader = cardListContainer.querySelector('header');

  const newNav = document.createElement('nav');
  newNav.classList.add('mainCardsNav');
  const newUl = document.createElement('ul');
  newNav.append(newUl);
  (['hero', 'unit', 'spell', 'equip']).forEach((type) => {
    const newLi = document.createElement('li');
    newUl.append(newLi);
    const newLink = document.createElement('a');
    newLink.href = '#';
    newLink.textContent = type;
    newLink.append(newLink);
  });
  cardListHeader.after(newNav);
}

function applyTypeFilter(type) {
  document.currentTypeFilter = type;
  document.querySelectorAll('#libraryCards .card').forEach((card) => {
    if (card.classList.contains(type) || type === '') {
      card.classList.add('visible');
    } else {
      card.classList.remove('visible');
    }
  });
}