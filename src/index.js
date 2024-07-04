const getLibraryCards = () => document.getElementById('libraryCards');

const observer = new MutationObserver((mutation, observer) => {
  console.log('mutation observed');
  const libraryCards = getLibraryCards();
  if (!libraryCards) return;

  observer.disconnect();
  const newButton = document.createElement('div');
  newButton.classList.add('button');
  newButton.innerText = 'New custom button';
  libraryCards.querySelector('header .filters').prepend(newButton);
  console.log('button added');
});

const wrapper = document.getElementById('wrapper');
observer.observe(wrapper, { childList: true, subtree: true });
console.log('observer started');
