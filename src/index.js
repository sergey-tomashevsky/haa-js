import { CollectionPage, MarketPage } from "./pages";

let currentPage;

function executeCurrentRoute() {
  if (window.location.href.includes('/decks')) {
    currentPage = new CollectionPage();
  }
  if (window.location.href.includes('/market'))  {
    currentPage = new MarketPage();
  }

  console.log('executeCurrentRoute', currentPage);
  if (currentPage) currentPage.run();
}

window.navigation.addEventListener("navigate", (event) => {
  console.log('Location changed', window.location.href, event);
  if (currentPage) currentPage.disconnect();
  currentPage = null;
  executeCurrentRoute();
});

executeCurrentRoute();
