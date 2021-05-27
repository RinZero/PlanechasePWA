
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

const assetPaths = ['assets/opca-1-chaotic-aether.jpg', 'assets/opca-2-interplanar-tunnel.jpg', 'assets/opca-3-morphic-tide.jpg','assets/opca-4-mutual-epiphany.jpg',
'assets/opca-5-planewide-disaster.jpg', 'assets/opca-6-reality-shaping.jpg', 'assets/opca-7-spatial-merging.jpg', 'assets/opca-8-time-distortion.jpg', 'assets/opca-9-academy-at-tolaria-west.jpg', 'assets/opca-10-the-aether-flues.jpg', 'assets/opca-11-agyrem.jpg', 'assets/opca-12-akoum.jpg',
'assets/opca-13-aretopolis.jpg', 'assets/opca-14-astral-arena.jpg', 'assets/opca-15-bant.jpg', 'assets/opca-16-bloodhill-bastion.jpg', 'assets/opca-17-celestine-reef.jpg','assets/opca-18-cliffside-market.jpg', 'assets/opca-19-the-dark-barony.jpg', 'assets/opca-20-edge-of-malacol.jpg', 'assets/opca-21-eloren-wilds.jpg', 'assets/opca-22-the-eon-fog.jpg',
 'assets/opca-23-feeding-grounds.jpg', 'assets/opca-24-fields-of-summer.jpg', 'assets/opca-25-the-fourth-sphere.jpg', 'assets/opca-26-furnace-layer.jpg', 'assets/opca-27-gavony.jpg', 'assets/opca-28-glen-elendra.jpg', 'assets/opca-29-glimmervoid-basin.jpg', 'assets/opca-30-goldmeadow.jpg', 'assets/opca-31-grand-ossuary.jpg', 'assets/opca-32-the-great-forest.jpg',
 'assets/opca-33-grixis.jpg','assets/opca-34-grove-of-the-dreampods.jpg', 'assets/opca-35-hedron-fields-of-agadeem.jpg', 'assets/opca-36-the-hippodrome.jpg', 'assets/opca-37-horizon-boughs.jpg','assets/opca-38-immersturm.jpg', 'assets/opca-39-isle-of-vesuva.jpg', 'assets/opca-40-izzet-steam-maze.jpg','assets/opca-41-jund.jpg','assets/opca-42-kessig.jpg','assets/opca-43-kharasha-foothills.jpg','assets/opca-44-kilnspire-district.jpg', 'assets/opca-45-krosa.jpg',
'assets/opca-46-lair-of-the-ashen-idol.jpg','assets/opca-47-lethe-lake.jpg','assets/opca-48-llanowar.jpg','assets/opca-49-the-maelstrom.jpg', 'assets/opca-50-minamo.jpg', 'assets/opca-51-mirrored-depths.jpg', 'assets/opca-52-mount-keralia.jpg', 'assets/opca-53-murasa.jpg', 'assets/opca-54-naar-isle.jpg','assets/opca-55-naya.jpg','assets/opca-56-nephalia.jpg', 'assets/opca-57-norn-s-dominion.jpg', 'assets/opca-58-onakke-catacomb.jpg','assets/opca-59-orochi-colony.jpg','assets/opca-60-orzhova.jpg',
'assets/opca-61-otaria.jpg','assets/opca-62-panopticon.jpg','assets/opca-63-pools-of-becoming.jpg','assets/opca-64-prahv.jpg','assets/opca-65-quicksilver-sea.jpg','assets/opca-66-raven-s-run.jpg','assets/opca-67-sanctum-of-serra.jpg','assets/opca-68-sea-of-sand.jpg','assets/opca-69-selesnya-loft-gardens.jpg','assets/opca-70-shiv.jpg','assets/opca-71-skybreen.jpg','assets/opca-72-sokenzan.jpg','assets/opca-73-stairs-to-infinity.jpg','assets/opca-74-stensia.jpg','assets/opca-75-stronghold-furnace.jpg','assets/opca-76-takenuma.jpg','assets/opca-77-talon-gates.jpg','assets/opca-78-tazeem.jpg','assets/opca-79-tember-city.jpg',
'assets/opca-80-trail-of-the-mage-rings.jpg', 'assets/opca-81-truga-jungle.jpg','assets/opca-82-turri-island.jpg','assets/opca-83-undercity-reaches.jpg','assets/opca-84-velis-vel.jpg','assets/opca-85-windriddle-palaces.jpg', 'assets/opca-86-the-zephyr-maze.jpg']
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

  self.clients.matchAll().then(function (clients) {
    clients.forEach(function (client) {
      client.postMessage(
        "Hi client " + client.id + ". You requested:" + fetchEvent.request.url
      );
    });
  });

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
  // Receive the data from the client
  const data = event.data;

  // The unique ID of the tab
  const clientId = event.source.id 

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