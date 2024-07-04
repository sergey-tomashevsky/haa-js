const getLibraryCards = () => document.getElementById('libraryCards');

const observer = new MutationObserver((_mutation, observer) => {
  const libraryCards = getLibraryCards();
  if (!libraryCards) return;

  observer.disconnect();
  const newButton = document.createElement('div');
  newButton.classList.add('button');
  newButton.innerText = 'New custom button';
  libraryCards.querySelector('header .filters').prepend(newButton);
});

const wrapper = document.getElementById('wrapper');
observer.observe(wrapper, { childList: true, subtree: true });
