import fixCardNameFontSize from '../utils/fixCardNameFontSize';
import Page from './page';

const TYPE_OPTIONS = [
  { text: 'Hero', value: 'hero' },
  { text: 'Unit', value: 'unit' },
  { text: 'Spell', value: 'spell' },
  { text: 'Companion', value: 'equip' },
  { text: 'Adapt', value: 'upgrade', adminOnly: true },
  { text: 'Craft', value: 'craft', adminOnly: true },
  { text: 'Token', value: 'token', adminOnly: true },
  { text: 'Hero Power', value: 'heroPower', adminOnly: true },
  { text: 'Law', value: 'law', adminOnly: true },
  { text: 'Draft Pack', value: 'draftPack', adminOnly: true },
];

let currentTypeFilter = 'hero';

export default class CardsPage extends Page {
  run()  {
    updateFullCardPreview();

    const observer = new MutationObserver(() => {
      const cardsContainer = document.getElementById('cardsList');
      if (!cardsContainer) return;

      addCustomTypeNav();
      applyTypeFilter(currentTypeFilter);

      const cardsByIndex = window.ty.fullCardsListIndex.nid;
      cardsContainer.querySelectorAll('#card-list-container .card:not(.customElement)').forEach((card) => {
        const properties = document.createElement('div');
        properties.classList.add('properties');
        card.append(properties);

        // const cardImage = card.querySelector('img');
        // cardImage.setAttribute('loading', 'lazy');
        card.classList.add('customElement');
        card.classList.add('visible');

        const cardInfo = cardsByIndex[card.getAttribute('data-cardid')];
        if (!cardInfo) return;

        // Skip cost for heroes.
        if (!card.classList.contains('hero')) {
          addStat('cost', cardInfo, properties);
        }

        if (card.classList.contains('hero') || card.classList.contains('unit') || card.classList.contains('equip')) {
          addStat('atk', cardInfo, properties, true);
        }
        if (card.classList.contains('hero') || card.classList.contains('unit')) {
          addStat('health', cardInfo, properties);
        }
        if (card.classList.contains('equip')) {
          addStat('dur', cardInfo, properties);
        }
        addStat('source', cardInfo, properties);
        addStat('reqSource', cardInfo, properties);
      });
    });

    const wrapper = document.getElementById('wrapper');
    observer.observe(wrapper, { childList: true, subtree: true });
    this._observers.push(observer);
  }
}

function updateFullCardPreview() {
  const observer = new MutationObserver(() => {
    const fullCardPreviewContainer = document.getElementById('card-properties');
    if (!fullCardPreviewContainer) return;

    fixCardNameFontSize(fullCardPreviewContainer);
  });

  observer.observe(document.body, { childList: true });
}

function addStat(statName, cardInfo, container, forceZeroIfNull = false) {
  if (cardInfo[statName] === undefined) return null;

  const stat = document.createElement('div');
  if (!forceZeroIfNull && cardInfo[statName] === null) return;

  const statValue = cardInfo[statName] || 0;
  stat.setAttribute('data-name', statName);
  stat.setAttribute('data-value', statValue + '');
  stat.classList.add('property');
  stat.classList.add('mainProperty');
  stat.innerText = statValue;
  container.append(stat);
}

function addCustomTypeNav() {
  const cardListContainer = document.getElementById('card-list-container');
  if (cardListContainer.querySelector('.mainCardsNav')) return;

  const cardListHeader = cardListContainer.querySelector('header');

  const newNav = document.createElement('nav');
  newNav.classList.add('mainCardsNav');
  const newUl = document.createElement('ul');
  newNav.append(newUl);

  const isUserAdmin = window.ty.dulst.admin;

  (TYPE_OPTIONS).forEach((typeObj, index) => {
    if (typeObj.adminOnly && !isUserAdmin) return;

    if (document.querySelector(`#cardsList .mainCards > div[data-cardtype="${typeObj.value}"] > .card-list-container`)?.childNodes.length === 0) return;

    const newLi = document.createElement('li');
    if (index === 0) {
      newLi.classList.add('active');
    }
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
  document.querySelectorAll('#cardsList .mainCards > *').forEach((cardTypeContainer) => {
    cardTypeContainer.querySelector('h5').style.display = 'none';
    if (cardTypeContainer.dataset.cardtype === type) {
      cardTypeContainer.style.display = 'block';
    } else {
      cardTypeContainer.style.display = 'none';
    }
  });
}