import Page from "./pages/page";

export default class FullCardInfoUpdater extends Page {
  run() {
    const pageObserver = new MutationObserver((_, observer) => {
      const cardInfoContainer = document.getElementById('cardFullInfo');
      if (!cardInfoContainer) return;

      observer.disconnect();
      console.log('pageObserver disconnect');
      const fullCardInfoObserver = new MutationObserver(() => {
        console.log('cardInfoContainer updated');
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

      fullCardInfoObserver.observe(cardInfoContainer, { childList: true, subtree: true });
      this._observers.push(observer);
      console.log('fullCardInfoObserver started');
    });

    const wrapper = document.getElementById('wrapper');
    pageObserver.observe(wrapper, { childList: true, subtree: true });
    console.log('page observer started');
  }
}
