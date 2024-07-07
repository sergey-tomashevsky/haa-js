import Page from './page';

export default class CardsPage extends Page {
  run()  {
    const observer = new MutationObserver((mutation) => {
      const cardsContainer = document.getElementById('cardsList');
      if (!cardsContainer) return;

      const cardsByIndex = window.ty.fullCardsListIndex.nid;
      cardsContainer.querySelectorAll('#card-list-container .card:not(.customElement)').forEach((card) => {
        const properties = document.createElement('div');
        properties.classList.add('properties');
        card.append(properties);

        const cardImage = card.querySelector('img');
        cardImage.setAttribute('loading', 'lazy');
        card.classList.add('customElement');

        const cardInfo = cardsByIndex[card.getAttribute('data-cardid')];
        if (!cardInfo) return;

        // Skip cost for heroes.
        if (!card.classList.contains('hero')) {
          addStat('cost', cardInfo, properties);
        }

        addStat('atk', cardInfo, properties);
        addStat('health', cardInfo, properties);
      });
    });

    const wrapper = document.getElementById('wrapper');
    observer.observe(wrapper, { childList: true, subtree: true });
    this._observers.push(observer);
  }
}

function addStat(statName, cardInfo, container) {
  if (cardInfo[statName] === undefined) return null;

  const stat = document.createElement('div');
  stat.setAttribute('data-name', statName);
  stat.setAttribute('data-value', cardInfo[statName] + '');
  stat.classList.add('property');
  stat.classList.add('mainProperty');
  stat.innerText = cardInfo[statName];
  container.append(stat);
}