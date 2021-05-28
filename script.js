
//original idea => fetch the cards each time 
//unused for 
/*
const getCards = async () => {
  const cards = await axios
    .get('https://api.scryfall.com/cards/search?q=t%3Aplane+or+t%3Aphenom')
    .then(function (response) {
      // handle success
      return response.data.data
    })
    .catch(function (error) {
      // handle error
      console.log(error)
    })
  return cards
}
*/

const shuffleDeck = (deck) => {
  let currentIndex = deck.length,
    temporaryValue,
    randomIndex
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = deck[currentIndex]
    deck[currentIndex] = deck[randomIndex]
    deck[randomIndex] = temporaryValue
  }
  return deck
}

const askPermission = () => {
  return new Promise(function (resolve, reject) {
    const permissionResult = Notification.requestPermission(function (result) {
      resolve(result)
    })

    if (permissionResult) {
      permissionResult.then(resolve, reject)
    }
  }).then(function (permissionResult) {
    if (permissionResult !== 'granted') {
      throw new Error("We weren't granted permission.")
    }
  })
}

// for Push Companion
function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

const butNewGame = document.getElementById('butNewGame')
const butNextTurn = document.getElementById('butNextTurn')
const butInstall = document.getElementById('butInstall')
const butPost = document.getElementById('butPost')
const subscriptionField = document.getElementById('subscriptionField')
const butSubscribe = document.getElementById('butSubscribe')
const butRollDice = document.getElementById('butRollDice')
let swRegistration = null

const cards = [
  'assets/opca-1-chaotic-aether.jpg',
  'assets/opca-2-interplanar-tunnel.jpg',
  'assets/opca-3-morphic-tide.jpg',
  'assets/opca-4-mutual-epiphany.jpg',
  'assets/opca-5-planewide-disaster.jpg',
  'assets/opca-6-reality-shaping.jpg',
  'assets/opca-7-spatial-merging.jpg',
  'assets/opca-8-time-distortion.jpg',
  'assets/opca-9-academy-at-tolaria-west.jpg',
  'assets/opca-10-the-aether-flues.jpg',
  'assets/opca-11-agyrem.jpg',
  'assets/opca-12-akoum.jpg',
  'assets/opca-13-aretopolis.jpg',
  'assets/opca-14-astral-arena.jpg',
  'assets/opca-15-bant.jpg',
  'assets/opca-16-bloodhill-bastion.jpg',
  'assets/opca-17-celestine-reef.jpg',
  'assets/opca-18-cliffside-market.jpg',
  'assets/opca-19-the-dark-barony.jpg',
  'assets/opca-20-edge-of-malacol.jpg',
  'assets/opca-21-eloren-wilds.jpg',
  'assets/opca-22-the-eon-fog.jpg',
  'assets/opca-23-feeding-grounds.jpg',
  'assets/opca-24-fields-of-summer.jpg',
  'assets/opca-25-the-fourth-sphere.jpg',
  'assets/opca-26-furnace-layer.jpg',
  'assets/opca-27-gavony.jpg',
  'assets/opca-28-glen-elendra.jpg',
  'assets/opca-29-glimmervoid-basin.jpg',
  'assets/opca-30-goldmeadow.jpg',
  'assets/opca-31-grand-ossuary.jpg',
  'assets/opca-32-the-great-forest.jpg',
  'assets/opca-33-grixis.jpg',
  'assets/opca-34-grove-of-the-dreampods.jpg',
  'assets/opca-35-hedron-fields-of-agadeem.jpg',
  'assets/opca-36-the-hippodrome.jpg',
  'assets/opca-37-horizon-boughs.jpg',
  'assets/opca-38-immersturm.jpg',
  'assets/opca-39-isle-of-vesuva.jpg',
  'assets/opca-40-izzet-steam-maze.jpg',
  'assets/opca-41-jund.jpg',
  'assets/opca-42-kessig.jpg',
  'assets/opca-43-kharasha-foothills.jpg',
  'assets/opca-44-kilnspire-district.jpg',
  'assets/opca-45-krosa.jpg',
  'assets/opca-46-lair-of-the-ashen-idol.jpg',
  'assets/opca-47-lethe-lake.jpg',
  'assets/opca-48-llanowar.jpg',
  'assets/opca-49-the-maelstrom.jpg',
  'assets/opca-50-minamo.jpg',
  'assets/opca-51-mirrored-depths.jpg',
  'assets/opca-52-mount-keralia.jpg',
  'assets/opca-53-murasa.jpg',
  'assets/opca-54-naar-isle.jpg',
  'assets/opca-55-naya.jpg',
  'assets/opca-56-nephalia.jpg',
  'assets/opca-57-norn-s-dominion.jpg',
  'assets/opca-58-onakke-catacomb.jpg',
  'assets/opca-59-orochi-colony.jpg',
  'assets/opca-60-orzhova.jpg',
  'assets/opca-61-otaria.jpg',
  'assets/opca-62-panopticon.jpg',
  'assets/opca-63-pools-of-becoming.jpg',
  'assets/opca-64-prahv.jpg',
  'assets/opca-65-quicksilver-sea.jpg',
  'assets/opca-66-raven-s-run.jpg',
  'assets/opca-67-sanctum-of-serra.jpg',
  'assets/opca-68-sea-of-sand.jpg',
  'assets/opca-69-selesnya-loft-gardens.jpg',
  'assets/opca-70-shiv.jpg',
  'assets/opca-71-skybreen.jpg',
  'assets/opca-72-sokenzan.jpg',
  'assets/opca-73-stairs-to-infinity.jpg',
  'assets/opca-74-stensia.jpg',
  'assets/opca-75-stronghold-furnace.jpg',
  'assets/opca-76-takenuma.jpg',
  'assets/opca-77-talon-gates.jpg',
  'assets/opca-78-tazeem.jpg',
  'assets/opca-79-tember-city.jpg',
  'assets/opca-80-trail-of-the-mage-rings.jpg',
  'assets/opca-81-truga-jungle.jpg',
  'assets/opca-82-turri-island.jpg',
  'assets/opca-83-undercity-reaches.jpg',
  'assets/opca-84-velis-vel.jpg',
  'assets/opca-85-windriddle-palaces.jpg',
  'assets/opca-86-the-zephyr-maze.jpg',
]

const stateToServiceWorker = (data) => {
  if (navigator.serviceWorker && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage(data)
  }
}
const getDiceTax = () => {
  let diceTax = parseInt(document.getElementById('diceTax').innerHTML)
  if (!isNaN(diceTax)) {
    return diceTax
  } else {
    return 0
  }
}

const setDiceTax = (diceTax, fromOtherTab) => {
  document.getElementById('diceTax').innerHTML = parseInt(diceTax.tax)
  rollResult = document.getElementById('rollResult')
  if (!isNaN(parseInt(diceTax.roll))) {
    if (parseInt(diceTax.roll) === 1) {
      rollResult.innerHTML = 'The dice rolled chaos. Trigger the plane-effect'
    } else if (parseInt(diceTax.roll) === 6) {
      setActiveCard(deck.pop())
      rollResult.innerHTML =
        'The dice rolled planeswalk. The plane has been changed'
    } 
    else {
      rollResult.innerHTML = 'The dice rolled blank. Nothing happens'
    }
  }
  if(diceTax.message){
    rollResult.innerHTML = diceTax.message
  }
  if (!fromOtherTab) {
    stateToServiceWorker({ property: 'diceTax', state: diceTax })
  }
}

const setActiveCard = (activeCard, fromOtherTab) => {
  document.getElementById('activeCard').src = activeCard
  if (!fromOtherTab) {
    stateToServiceWorker({ property: 'activeCard', state: activeCard })
  }
}
const deck = shuffleDeck(cards)
setActiveCard(deck.pop())

const subscribeUser = () => {
  const applicationServerKey = urlB64ToUint8Array(
    'BIQ8OhowXfTajbqmQIiX7YXLiG4sPaIAfKU76M5zDHZte7x0HLwZrm5_rh3mSPLE7BTz-fuaBNgZ-NEP9944lUo'
  )
  swRegistration.pushManager
    .subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey,
    })
    .then(function (subscription) {
      console.log('User is subscribed', subscription)

      // Comment back in, if you want to use Push Companion
      // subscriptionField.classList.remove('is-invisible')
      // subscriptionField.textContent = JSON.stringify(subscription);
      butSubscribe.innerHTML = 'Unsubscribe'
    })
    .catch(function (err) {
      console.log('Failed to subscribe the user: ', err)
    })
}

const unsubscribeUser = () => {
  swRegistration.pushManager
    .getSubscription()
    .then(function (subscription) {
      if (subscription) {
        return subscription.unsubscribe()
      }
    })
    .catch(function (error) {
      console.log('Error unsubscribing', error)
    })
    .then(function () {
      console.log('User is unsubscribed.')
      butSubscribe.innerHTML = 'Subscribe'
    })
}

const updateButtonVisibilityChange = (reg) =>{
  console.log("hiii")
  if (reg) {
    const butUpdate = document.getElementById("butUpdate");
    butUpdate.classList.remove('is-invisible')
    butUpdate.addEventListener("click", () => {
      reg.waiting.postMessage("update");
    })
   
  }
}
const listenForWaitingServiceWorker = (reg, callback) => {
  console.log(reg)
   function awaitStateChange() {
    reg.installing.addEventListener("statechange", function () {
      if (this.state === "installed") callback(reg);
    });
  }
  if (!reg) return;
  if (reg.waiting) return callback(reg);
  if (reg.installing) awaitStateChange();
  reg.addEventListener("updatefound", awaitStateChange);
  console.log(reg)
};

if ('serviceWorker' in navigator && 'PushManager' in window) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then( ()=> {
        return navigator.serviceWorker.ready
      })
      .then(reg => {
        console.log('Service Worker is ready', reg)
        listenForWaitingServiceWorker(reg, updateButtonVisibilityChange)
        navigator.serviceWorker.addEventListener('message', event => {
          if (event.data) {
            if (
              event.data.property === 'activeCard' &&
              event.data.state !== undefined
            ) {
              setActiveCard(event.data.state, true)
            }

            if (
              event.data.property === 'diceTax' &&
              event.data.state !== undefined
            ) {
              setDiceTax(event.data.state, true)
            }
          }
        })
        swRegistration = reg
      })
      .catch(e=>{
        console.log("Error: ", e)
      })
      
  })
}


let defferredPrompt

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('Installation event fired')
  e.preventDefault()

  defferredPrompt = e
  return false
})

butInstall.addEventListener('click', () => {
  if (defferredPrompt) {
    defferredPrompt.prompt()

    defferredPrompt.userChoice.then((res) => {
      if (res.outcome == 'dismissed') {
        console.log('Installation canceled')
      } else {
        console.log('App installed')
      }
      defferredPrompt = null
    })
  }
})

butNewGame.addEventListener('click', () => {
  askPermission()
  const deck = shuffleDeck(cards)
  setDiceTax({ tax: 0, roll: null, message: "The dice hasn't been rolled this game" })
  setActiveCard(deck.pop())
})
butSubscribe.addEventListener('click', () => {
  console.log(butSubscribe.innerHTML)
  if (butSubscribe.innerHTML === 'Subscribe') {
    subscribeUser()
  } else {
    unsubscribeUser()
  }
})
butRollDice.addEventListener('click', () => {
  const diceTax = {}
  diceTax.tax = getDiceTax()
  const diceRoll = Math.floor(Math.random() * 6) + 1
  diceTax.tax++
  diceTax.roll = diceRoll
  setDiceTax(diceTax)
})
butPost.addEventListener('click', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.controller.postMessage({
      name: 'Test',
      surname: 'Test',
      title: 'test',
      number: 2,
    })
  }
})

butNextTurn.addEventListener('click', () => {
  setDiceTax({ tax: 0, roll: null, message: "The dice hasn't been rolled this turn" })
})

let refreshing
navigator.serviceWorker.addEventListener('controllerchange', () => {
  if (refreshing) return
  refreshing = true
  window.location.reload(true)
})
