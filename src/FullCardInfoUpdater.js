import Page from "./pages/page";
import fixCardNameFontSize from "./utils/fixCardNameFontSize";

export default class FullCardInfoUpdater extends Page {
  run() {
    const cardInfoContainer = document.querySelector('.card-info-container.popup:not(.customElement)');
    if (!cardInfoContainer) {
      console.error('cardInfoContainer was not found');
      return;
    }

    const fullCardInfoObserver = new MutationObserver(() => {
      fixCardNameFontSize(cardInfoContainer);
    });

    fullCardInfoObserver.observe(cardInfoContainer, { childList: true });
    this._observers.push(fullCardInfoObserver);
    console.log('fullCardInfoObserver started');
  }
}
