import Page from "./pages/page";

export default class FullCardInfoUpdater extends Page {
  run() {
    const cardInfoContainer = document.querySelector('.card-info-container.popup:not(.customElement)');
    if (!cardInfoContainer) {
      console.error('cardInfoContainer was not found');
      return;
    }

    const fullCardInfoObserver = new MutationObserver(() => {
      console.log('cardInfoContainer updated');
      cardInfoContainer.classList.add('customElement');
      const nameContainer = cardInfoContainer.querySelector('.name');

      const nameClone = nameContainer.cloneNode(true);
      nameClone.style.opacity = 0;
      nameClone.style.whiteSpace = 'nowrap';
      nameClone.style.width = 'fit-content';
      nameClone.style.minWidth = '90%';
      nameContainer.parentElement.append(nameClone);
      let fontSize =
        parseFloat(window.getComputedStyle(nameContainer).getPropertyValue('font-size'));
      while (nameContainer.clientWidth < nameClone.clientWidth) {
        fontSize -= 1;
        nameClone.style.fontSize = fontSize + 'px';
      }
      nameContainer.style.fontSize = fontSize + 'px';
      nameClone.remove();
      console.log('finished');
    });

    fullCardInfoObserver.observe(cardInfoContainer, { childList: true });
    this._observers.push(fullCardInfoObserver);
    console.log('fullCardInfoObserver started');
  }
}
