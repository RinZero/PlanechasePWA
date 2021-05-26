// import 'regenerator-runtime/runtime';
// import axios from 'axios';

const getCards = async () => {
  const cards = await axios.get('https://api.scryfall.com/cards/search?q=t%3Aplane+or+t%3Aphenom')
  .then(function (response) {
      // handle success
      return response.data.data
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  return cards
}

const shuffleDeck = (deck) => {
  let currentIndex = deck.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = deck[currentIndex];
    deck[currentIndex] = deck[randomIndex];
    deck[randomIndex] = temporaryValue;
  }
  return deck;
}

 const testFunc = async() => {
  const deck = await getCards()
  await shuffleDeck(deck)
  console.log(deck)
}


const butNewGame = document.getElementById("butNewGame");
const butSend = document.getElementById("butSend");

let defferredPrompt;
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(reg => {
        console.log("Service worker registered!", reg);
      })
      .catch(e => {
        console.log("Error!", e);
      });
  });
}

butNewGame.addEventListener("click", () => {
  testFunc()
});
