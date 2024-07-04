import Page from './page';

export default class SetsPage extends Page {
  run()  {
    const observer = new MutationObserver(() => {
      const setsContainer = document.getElementById('setsContainer');
      if (!setsContainer) return;

      // Skip updating if custom elements already exist.
      if (setsContainer.querySelector('.customElement')) return;

      this.#updateMarketLink(setsContainer);
      this.#highlightMarketHeaderLink();
    });

    const wrapper = document.getElementById('wrapper');
    observer.observe(wrapper, { childList: true, subtree: true });
    this._observers.push(observer);
  }

  #updateMarketLink(container) {
    const newMarketLink = container.querySelector('header.page menu.secondaryMenu a:first-child');
    const gameSubdomain = window.ty.dulst.subdomain;
    newMarketLink.href = `/${gameSubdomain}/market`;
    newMarketLink.classList.add('customElement');
    newMarketLink.innerHTML = 'Market';
  }

  #highlightMarketHeaderLink() {
    const marketLink = document.querySelector('#wrapper header.header li.market');
    marketLink.classList.add('active');
  }
}