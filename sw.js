
//  import 'regenerator-runtime/runtime';
// import axios from 'axios';

// export const getCards = async () => {
//     const cards = await axios.get('https://api.scryfall.com/cards/search?q=type%3Aplane')
//     .then(function (response) {
//         // handle success
//         console.log(response.data.data)
//         return response.data.data
//       })
//       .catch(function (error) {
//         // handle error
//         console.log(error);
//       })
//     return cards
//   }
  
//   export const shuffleDeck = (deck) => {
//     let currentIndex = deck.length, temporaryValue, randomIndex;
//     while (0 !== currentIndex) {
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex -= 1;
//       temporaryValue = deck[currentIndex];
//       deck[currentIndex] = deck[randomIndex];
//       deck[randomIndex] = temporaryValue;
//     }
//     return deck;
//   }
const SW_VERSION = 1;
const CACHE_NAME = `OFFLINE_VERSION_${SW_VERSION}`;
const OFFLINE_URL = "offline.html";

const assetPaths = ['assets/opca-1-chaotic-aether.jpg', 'assets/opca-2-interplanar-tunnel.jpg', 'assets/opca-3-morphic-tide.jpg']
self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] install event", event);
  //self.skipWaiting();

  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      await cache.addAll([OFFLINE_URL, ...assetPaths]);
    //   const deck = await getCards()
    //   console.log(deck)
    //   //await shuffleDeck(deck)
    //   await cache.add(new Request(deck, { cache: "reload"}))
      console.log("Offline page cached");
    })()
  );
});