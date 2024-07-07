import Page from './page';

export default class CardsPage extends Page {
  run()  {
    const observer = new MutationObserver((mutation) => {
      const cardsContainer = document.getElementById('cardsList');
      if (!cardsContainer) return;

      // Skip updating if custom elements already exist.
      if (cardsContainer.querySelector('.customElement')) return;

      const cardsByIndex = window.ty.fullCardsListIndex.nid;
      cardsContainer.querySelectorAll('#card-list-container .card:not(.customElement)').forEach((card) => {
        const properties = document.createElement('div');
        card.append(properties);
        const cardImage = card.querySelector('img');
        cardImage.setAttribute('loading', 'lazy');
        card.classList.add('customElement');
      });
    });

    const wrapper = document.getElementById('wrapper');
    observer.observe(wrapper, { childList: true, subtree: true });
    this._observers.push(observer);
  }
}