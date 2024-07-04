import { CollectionPage, MarketPage } from "./pages";

let currentPage;

function executeRoute(url) {
  if (url.includes('/decks')) {
    currentPage = new CollectionPage();
  }
  if (url.includes('/market'))  {
    currentPage = new MarketPage();
  }

  console.log('executeRoute', currentPage);
  if (currentPage) currentPage.run();
}

window.navigation.addEventListener("navigate", (event) => {
  console.log('Location changed', event);
  if (currentPage) currentPage.disconnect();
  currentPage = null;
  executeRoute(event.destination.url);
});

executeRoute(window.location.href);
