import FullCardInfoUpdater from "./FullCardInfoUpdater";
import { CardsPage, CollectionPage, MarketPage, SetsPage } from "./pages";

let currentPage;
const fullCardInfoUpdater = new FullCardInfoUpdater();

function executeRoute(url) {
  if (url.includes('/cards')) {
    currentPage = new CardsPage();
  }
  if (url.includes('/decks')) {
    currentPage = new CollectionPage();
  }
  if (url.includes('/market')) {
    currentPage = new MarketPage();
  }
  if (url.includes('/sets')) {
    currentPage = new SetsPage();
  }

  if (currentPage) currentPage.run();
}

function initOnlinePlayerTracker() {
  let onlinePlayers = {};

  window.ty.realtime.on("message", (message) => {
    if (message.type === "player-online") {
      onlinePlayers[message.userName] = {
        avatar: message.avatarUrl,
      };
      console.log('onlinePlayers', onlinePlayers);
    }
    if (message.type === "player-disconnect") {
      delete onlinePlayers[message.userName];
    }
    if (message.type === "player-ping") {
      if (!ty.user.current.profile.id) {
        return;
      }

      window.ty.realtime.send({
        type: "player-online",
        userName: window.ty.user.current.user,
        avatarUrl: window.ty.user.current.fieldAvatar,
      });
    }
  });

  window.ty.realtime.send({
    type: "player-ping",
  });
}

window.navigation.addEventListener("navigate", (event) => {
  if (currentPage) currentPage.disconnect();
  currentPage = null;
  executeRoute(event.destination.url);
});

executeRoute(window.location.href);
fullCardInfoUpdater.run();

// initOnlinePlayerTracker();
