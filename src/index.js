let currentObservers = [];

function updateCollectionPage() {
  const observer = new MutationObserver(() => {
    const libraryCards = document.getElementById('libraryCards');
    if (!libraryCards) return;

    // Skip updating if custom elements already exist.
    if (libraryCards.querySelector('.customElement')) return;

    const newButton = document.createElement('div');
    newButton.classList.add('button');
    newButton.classList.add('customElement');
    newButton.innerText = 'New custom button';
    libraryCards.querySelector('header .filters').prepend(newButton);
    console.log('button added');
  });

  const wrapper = document.getElementById('wrapper');
  observer.observe(wrapper, { childList: true, subtree: true });
  currentObservers.push(observer);
  console.log('observer started');
}

function executeCurrentRoute() {
  if (window.location.href.includes('/decks')) {
    updateCollectionPage()
  }
}

function stopCurrentObservers() {
  currentObservers.forEach(observer => {
    observer.disconnect();
  });
  currentObservers = [];
}

window.navigation.addEventListener("navigate", (event) => {
  console.log('location changed!');
  stopCurrentObservers();
  executeCurrentRoute();
});

executeCurrentRoute();
