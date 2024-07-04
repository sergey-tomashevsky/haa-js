import { CollectionPage, MarketPage } from "./pages";

let currentPage;

function executeCurrentRoute() {
  if (window.location.href.includes('/decks')) {
    currentPage = new CollectionPage();
  }
  if (window.location.href.includes('/market'))  {
    currentPage = new MarketPage();
  }

  if (currentPage) currentPage.run();
}

window.navigation.addEventListener("navigate", (event) => {
  if (currentPage) currentPage.disconnect();
  currentPage = null;
  executeCurrentRoute();
});

executeCurrentRoute();
