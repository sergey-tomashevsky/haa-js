import Page from "./page";

const TYPE_OPTIONS = [
  { text: 'Hero', value: 'hero' },
  { text: 'Unit', value: 'unit' },
  { text: 'Spell', value: 'spell' },
  { text: 'Companion', value: 'equip' },
  { text: 'Adapt', value: 'upgrade' },
  { text: 'Craft', value: 'craft' },
  { text: 'Token', value: 'token' },
  { text: 'Hero Power', value: 'heroPower' },
  { text: 'Law', value: 'law' },
  { text: 'Draft Pack', value: 'draftPack'},
];

let currentTypeFilter = 'hero';

export default class CollectionPage extends Page {
  run() {
    const observer = new MutationObserver(() => {
      const libraryCards = document.getElementById('libraryCards');
      if (!libraryCards) return;

      addCustomTypeNav();
      applyTypeFilter(currentTypeFilter);

      // Skip updating if custom elements already exist.
      if (libraryCards.querySelector('.customSelect')) return;

      document.querySelectorAll('#libraryCards .card').forEach(card => {
        card.classList.add('visible');
      });
      return;
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
  (TYPE_OPTIONS).forEach((typeObj) => {
    if (document.querySelector(`#libraryCards .mainCards > div[data-cardtype="${typeObj.value}"] > .card-list-container`)?.childNodes.length === 0) return;

    const newLi = document.createElement('li');
    newUl.append(newLi);
    const newLink = document.createElement('a');
    newLink.href = '#';
    newLink.textContent = typeObj.text;

    newLink.addEventListener('click', (event) => {
      const linkParent = event.target.parentElement;
      if (linkParent.classList.contains('active')) return;

      linkParent.parentElement.querySelectorAll('li').forEach((li) => {
        li.classList.remove('active');
      });
      linkParent.classList.add('active');
      currentTypeFilter = typeObj.value;
      console.log('Type filter:', currentTypeFilter);
      applyTypeFilter(currentTypeFilter);
    });

    newLi.append(newLink);

    const mainCardsContainer = cardListContainer.querySelector('.mainCards');
    const observer = new MutationObserver(() => {
      if (!currentTypeFilter) return;

      applyTypeFilter(currentTypeFilter);
    });
    observer.observe(mainCardsContainer, { childList: true, subtree: true });
  });
  cardListHeader.after(newNav);
}

function applyTypeFilter(type) {
  document.querySelectorAll('#libraryCards .mainCards > *').forEach((cardTypeContainer) => {
    cardTypeContainer.querySelector('h5').style.display = 'none';
    if (cardTypeContainer.dataset.cardtype === type) {
      cardTypeContainer.style.display = 'block';
    } else {
      cardTypeContainer.style.display = 'none';
    }
  });
}