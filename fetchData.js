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

const askPermission = () => {
  return new Promise(function(resolve, reject) {
    const permissionResult = Notification.requestPermission(function(result) {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  })
  .then(function(permissionResult) {
    if (permissionResult !== 'granted') {
      throw new Error('We weren\'t granted permission.');
    }
  });
}

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const butNewGame = document.getElementById("butNewGame");
const butInstall = document.getElementById("butInstall");
const butSend = document.getElementById("butSend");
const subscriptionField = document.getElementById('subscriptionField');
const butUnsubscribe = document.getElementById("butUnsubscribe");
const butRollDice = document.getElementById("butRollDice");
let swRegistration = null;

function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array('BIQ8OhowXfTajbqmQIiX7YXLiG4sPaIAfKU76M5zDHZte7x0HLwZrm5_rh3mSPLE7BTz-fuaBNgZ-NEP9944lUo')
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    console.log('User is subscribed', subscription);

    //updateSubscriptionOnServer(subscription);
    // refresh ui and send Subscription to server
    subscriptionField.classList.remove('is-invisible')
    subscriptionField.textContent = JSON.stringify(subscription);
    isSubscribed = true;

  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
  });
}

const unsubscribeUser = () => {
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription) {
      return subscription.unsubscribe();
    }
  })
  .catch(function(error) {
    console.log('Error unsubscribing', error);
  })
  .then(function() {
    updateSubscriptionOnServer(null);

    console.log('User is unsubscribed.');
    isSubscribed = false;

    updateBtn();
  });
}




let defferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  console.log("Installation event fired");
  e.preventDefault();

  defferredPrompt = e;
  return false;
});

butInstall.addEventListener("click", () => {
  if (defferredPrompt) {
    defferredPrompt.prompt();

    defferredPrompt.userChoice.then((res) => {
      if (res.outcome == "dismissed") {
        console.log("Installation canceled");
      } else {
        console.log("App installed");
      }
      defferredPrompt = null;
    });
  }
});


if ("serviceWorker" in navigator && 'PushManager' in window) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(function() {
        return navigator.serviceWorker.ready;
    })
    .then(function(reg) {
        console.log('Service Worker is ready', reg);
        

        navigator.serviceWorker.addEventListener('message', function(event){
          console.log("test", event)
          if(event.data){
            
            if( event.data.property === "activeCard"&& event.data.state !== undefined){
              setActiveCard(event.data.state, true)
            }
            
            if( event.data.property === "diceTax"&& event.data.state !== undefined){
              setDiceTax(event.data.state, true)
            }
          }

          
      });
      swRegistration = reg;
        subscribeUser()
      })
      .catch(e => {
        console.log("Error!", e);
      });
  });
}

butNewGame.addEventListener("click", () => {
  askPermission()
});
butUnsubscribe.addEventListener("click", () => {
  unsubscribeUser()
});
butRollDice.addEventListener("click", () => {
  let diceTax = getDiceTax()
  setDiceTax(diceTax +1)
  setActiveCard('assets/opca-21-eloren-wilds.jpg')
})
butSend.addEventListener("click", function () {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.controller.postMessage({
      name: "Test",
      surname: "Test",
      title: "test",
      number: 2
    });
  }
});

let refreshing;
navigator.serviceWorker.addEventListener("controllerchange", () => {
  if (refreshing) return;
  refreshing = true;
  window.location.reload(true);
});


const stateToServiceWorker =(data)=>{
  if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(data);
  }
}
const getDiceTax = () => {
  let diceTax = parseInt(document.getElementById("diceTax").innerHTML);
  if (!isNaN(diceTax)) {
      return diceTax;
  } else {
      return 0;
  }
}

const setDiceTax = (diceTax, fromOtherTab) => {
  document.getElementById("diceTax").innerHTML = parseInt(diceTax);
  if (!fromOtherTab) {
      stateToServiceWorker({property: "diceTax", state: diceTax});
  }
}

const getActiveCard = () => {
  let activeCard = parseInt(document.getElementById("activeCard").innerHTML);
  if (!isNaN(activeCard)) {
      return activeCard;
  } else {
      return 0;
  }
}

const setActiveCard = (activeCard, fromOtherTab) => {
  document.getElementById("activeCard").src = activeCard;
  if (!fromOtherTab) {
      stateToServiceWorker({property: "activeCard", state: activeCard});
  }
}
