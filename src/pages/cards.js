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

        // Add card cost.
        if (cardInfo.cost) {
          const cost = document.createElement('div');
          cost.setAttribute('data-name', 'cost');
          cost.setAttribute('data-value', cardInfo.cost + '');
          cost.classList.add('property');
          cost.classList.add('mainProperty');
          cost.innerText = cardInfo.cost;
          properties.append(cost);
        }
      });
    });

    const wrapper = document.getElementById('wrapper');
    observer.observe(wrapper, { childList: true, subtree: true });
    this._observers.push(observer);
  }
}