
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
const OFFLINE_URL = "index.html";

const assetPaths = ['assets/opca-1-chaotic-aether.jpg', 'assets/opca-2-interplanar-tunnel.jpg', 'assets/opca-3-morphic-tide.jpg', 'assets/opca-12-akoum.jpg']
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

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');

  const title = '1 Push Nachricht';
  const options = {
    body: 'Von Codelabs',
    icon: 'assets/opca-2-interplanar-tunnel.jpg',
    badge: 'assets/opca-2-interplanar-tunnel.jpg'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("fetch",(fetchEvent) =>{
  console.log("[Service Worker] Fetch", fetchEvent.request.url);

  // self.clients.matchAll().then(function (clients) {
  //   clients.forEach(function (client) {
  //     client.postMessage(
  //       "Hi client " + client.id + ". You requested:" + fetchEvent.request.url
  //     );
  //   });
  // });

  fetchEvent.respondWith(
    (async () => {
      try {
        const networkResponse = await fetch(fetchEvent.request);
        return networkResponse;
      } catch (error) {
        console.log(
          "Fetch failed! returning cached page instead: ",
          error
        );

        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(OFFLINE_URL);

        return cachedResponse;
      }
    })()
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  //return self.clients.claim();
});

// self.addEventListener("message", function (event) {
//   console.log("Service worker received message:", event.data);
// });

self.addEventListener('message', function(event){
  console.log("hihihi")
  // Receive the data from the client
  var data = event.data;

  // The unique ID of the tab
  var clientId = event.source.id 

  // A function that handles the message
  self.syncTabState(data, clientId);
});


self.sendTabState = function(client, data){
  // Post data to a specific client
  client.postMessage(data);
}


self.syncTabState = function(data, clientId){
  self.clients.matchAll().then(function(clients) {

      // Loop over all available clients
      clients.forEach(function(client) {

          // No need to update the tab that 
          // sent the data
          if (client.id !== clientId) {
              self.sendTabState(client, data)
          }
         
      })
  })
}