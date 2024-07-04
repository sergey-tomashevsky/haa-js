import Page from './page';

export default class MarketPage extends Page {
  run()  {
    const observer = new MutationObserver((mutation) => {
      console.log('MarketPage: mutation observed', mutation);
      const marketContainer = document.getElementById('marketContainer');
      if (!marketContainer) return;

      console.log('MarketPage: marketContainer detected');
      // Skip updating if custom elements already exist.
      if (marketContainer.querySelector('.customElement')) return;

      const setsLink = document.createElement('a');
      const gameSubdomain = window.ty.subdomain;
      setsLink.href = `/${gameSubdomain}/sets`;
      setsLink.classList.add('customElement');
      setsLink.innerHTML = 'Sets';
      marketContainer.querySelector('header.page menu.secondaryMenu').append(setsLink);
      console.log('MarketPage: button added');
    });

    const wrapper = document.getElementById('wrapper');
    observer.observe(wrapper, { childList: true, subtree: true });
    this._observers.push(observer);
  }
}