# PlanechasePWA

This app is a helper for playing the Magic the Gathering-Formart Planechase with a shered PlanarDeck.
PlanchaseRules: https://mtg.fandom.com/wiki/Planechase_(format)

## Game Controlls

* DiceTax: Shows how much mana the next roll of the PlanarDice costs.
* RollDice: Rolls the planar dice. The results can be blank, chaos, and planeswalk. When planeswalk is rolled the active plane gets automaticalli switched.
* NextTurn: Passes the turn to the next Player => ressets the DiceTax
* NewGame: Resets and reshuffles the PlanarDeck. It also asks the user for the permission to use pushNotifications. 
           
## PWA Controlls
* Install: Starts the installation-process of the pwa, if it isn't already installed.
* Update: Shows only if there is an update for the pwa. A click of this button updates the pwa.
* Subscribe: Subscribes to a push-notivication service. The pwa is able to recieve push notifications after subscribing. 
* Post: Sends a mock push notification.

Subscribe and Post are both currently using the Push Compainion (https://web-push-codelab.glitch.me/)
if you intend to display the Subscription or change the keys, revert the marked comments in the source filse back to code.

## localSetup
run serve in the project folder.
got to localhost:5000
