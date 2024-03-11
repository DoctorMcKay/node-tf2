# Team Fortress 2 for Node.js
[![npm version](https://img.shields.io/npm/v/tf2.svg)](https://npmjs.com/package/tf2)
[![npm downloads](https://img.shields.io/npm/dm/tf2.svg)](https://npmjs.com/package/tf2)
[![license](https://img.shields.io/npm/l/tf2.svg)](https://github.com/DoctorMcKay/node-tf2/blob/master/LICENSE)
[![paypal](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=N36YVAT42CZ4G&item_name=node%2dtf2&currency_code=USD)

This module provides a very flexible interface for interacting with the [Team Fortress 2](http://store.steampowered.com)
Game Coordinator. It's designed to work with a [node-steam-user SteamUser](https://github.com/DoctorMcKay/node-steam-user) instance.

**You will need steam-user v4.2.0 or later and Node.js v14 or later to use tf2 v4.**  
You will need steam-user v4.2.0 or later and Node.js v8 or later to use tf2 v3.

# Setup

First, install it from npm:

	$ npm install tf2

Require the module and call its constructor with your SteamUser instance:

```js
const SteamUser = require('steam-user');
const TeamFortress2 = require('tf2');

let user = new SteamUser();
let tf2 = new TeamFortress2(user);
```

To initialize your GC connection, just launch TF2 via SteamUser normally:

```js
user.gamesPlayed([440]);
```

node-tf2 will emit a `connectedToGC` event when the game coordinator connection has been successfully established.
You shouldn't try to do anything before you receive that event.

# Enums

There are some enums that are used by various methods and events. You can find them in `enums.js`.

# Properties

There are a few useful read-only properties available to you.

### haveGCSession

`true` if we're currently connected to the GC, `false` otherwise. You should only call methods when we have an active GC session.

### itemSchema

After `itemSchemaLoaded` is emitted, this is the object representation of the parsed items_game.txt file. Before that point, this is undefined.

### backpack

After `backpackLoaded` is emitted, this is an array containing the contents of our backpack. Before that point, this is undefined.

### premium

`true` if this account is Premium, `false` if it's F2P. This value is defined right before `accountLoaded` is emitted.

### backpackSlots

The maximum number of items your backpack can hold. This value is defined right before `accountLoaded` is emitted.

### canSendProfessorSpeks

`true` if you can call `sendProfessorSpeks` to send the [Professor Speks](http://wiki.teamfortress.com/wiki/Professor_Speks) item to another user. This value is defined right before `accountLoaded` is emitted.

# Methods

### Constructor(steamClient)

When instantiating your node-tf2 instance, you need to pass your active SteamUser instance as the sole parameter, as shown here:

```js
let tf2 = new TeamFortress2(steamUser);
```

### setLang(localizationFile)

Call this method with the contents of an up-to-date localization file of your chosen language if you want localized events to be emitted. You can find the localization files under `tf/resource/tf_[language].txt`.

You can call this at any time, even when disconnected. If you get an updated localization file, you can call this again to update the cached version.

### craft(items[, recipe])

Craft `items` together into a new item, optionally using a specific `recipe`. The `recipe` parameter is optional and you don't normally need to specify it. `items` should be an array of item IDs to craft.

Recipe IDs can be found in `TeamFortress2.CraftRecipes` enum.

### trade(steamID)

Sends an in-game trade request to `steamID`. The other player must be playing TF2 currently. Listen for the `tradeResponse`
event for their response. If they accept, node-steam-user will emit
[`tradeRequest`](https://github.com/DoctorMcKay/node-steam-user#traderequest) and you can start the trade with
[node-steam-trade](https://github.com/seishun/node-steam-trade).

### cancelTradeRequest()

Cancels your current pending trade request. You can only send one trade request at a time so there is no need to pass any sort of identifier.

### respondToTrade(tradeID, accept)

Responds to an incoming trade request identified by `tradeID`. Pass `true` for `accept` to accept the trade request, or `false` to decline it.

### setStyle(item, style)

Sets the current `style` of an `item`. The `item` parameter should be an item ID, and the `style` parameter is the index of the desired style.

### setPosition(item, position)

Sets the `position` of an `item` in the backpack. The first slot on page 1 is position 1. `item` should be an item ID.

### deleteItem(item)

Deletes an `item`. The `item` parameter should be the ID of the item to delete. **This is a destructive operation.**

### wrapItem(wrapID, itemID)

Wraps the item with ID `itemID` using the gift wrap with ID `wrapID`.

### deliverGift(gift, steamID)

Sends a `gift` to a recipient with a `steamID`. The recipient doesn't need to be playing TF2. `gift` should be the ID of the wrapped gift item.

### unwrapGift(gift)

Unwraps a `gift`. The `gift` parameter should be the ID of a received wrapped gift item.

### useItem(item)

Generically use an item. The `item` parameter should be an item ID.

### sortBackpack(sortType)

Sorts your backpack. `sortType` is the ID of the type of sort you want. I don't know which sort type is which code, so you'll have to figure that out for yourself.

### sendProfessorSpeks(steamID)

If you're premium and you haven't sent them yet, this will thank a "helpful user" and grant them [Professor Speks](http://wiki.teamfortress.com/wiki/Professor_Speks). If they already have Speks, this will increment their "New Users Helped" counter.

The `steamID` parameter should be the recipient's 64-bit steamID. The recipient does not need to be on your friends list or in-game.

### createServerIdentity()

Creates a new GC gameserver identity account ID and token. Equivalent to running cl_gameserver_create_identity in the TF2 console. Listen for the `createIdentity` event for a response.

### getRegisteredServers()

Requests a list of your GC gameserver identities. Equivalent to running cl_gameserver_list in the TF2 console. Listen for the `registeredServers` event for the response.

### resetServerIdentity(id)

Resets the token of the server identified by a given `id`. This will make the GC generate a new token, invaliding the old one. Listen for the `resetIdentity` event for the response.

### openCrate(keyID, crateID)

Opens a crate with `crateID` using a key with `keyID`. If successful, you'll get two `itemRemoved` events, one for the key and one for the crate, followed by an `itemAcquired` event for what you received.

### requestWarStats([warID][, callback])
- `warID` - A [war ID](https://github.com/DoctorMcKay/node-tf2/blob/3fa354b2c1224b5885d9b9eb2818d17f76454cd7/enums.js#L78-L80) (defaults to HeavyVsPyro)
- `callback` - Identical to [`warStats`](#warstats) event

Requests global stats for a particular War.

# Events

### connectedToGC
- `version` - The current version reported by the GC

Emitted when a GC connection is established. You shouldn't use any methods before you receive this. Note that this may be received (after it's first emitted) without any disconnectedFromGC event being emitted. In this case, the GC simply restarted.

### disconnectedFromGC
- `reason` - The reason why we disconnected from the GC. This value is one of the values in the `GCGoodbyeReason` enum. If the value is unknown, you'll get a string representation instead.

Emitted when we disconnect from the GC. You shouldn't use any methods until `connectedToGC` is emitted.

### itemSchema
- `version` - The current version of the schema as a hexadecimal string
- `itemsGameUrl` - The URL to the current items_game.txt

Emitted when we get an updated item schema from the GC. node-tf2 will automatically download and parse the updated items_game.txt and will emit `itemSchemaLoaded` when complete.

### itemSchemaLoaded

Emitted when the up-to-date items_game.txt has been downloaded and parsed. It's available as `tf2.itemSchema`.

### itemSchemaError
- `err` - The error that occurred

Emitted if there was an error when downloading items_game.txt.

### systemMessage
- `message` - The message that was broadcast

Emitted when a system message is sent by Valve. In the official client, this is displayed as a regular pop-up notification box and in chat, and is accompanied by a beeping sound.

System messages are broadcast rarely and usually concern item server (GC) downtime.

### displayNotification
- `title` - Notification title (currently unused)
- `body` - Notification body text

Emitted when a GC-to-client notification is sent. In the official client, this is displayed as a regular pop-up notification box. Currently, this is only used for broadcasting Something Special For Someone Special acceptance messages.

Notifications have a valid and non-empty `title`, but the official client doesn't display it.

**This won't be emitted unless you call `setLang` with a valid localization file.**

### itemBroadcast
- `message` - The message text that is rendered by clients. This will be `null` if you haven't called `setLang` with a valid localization file or if the schema isn't loaded.
- `username` - The name of the user that received/deleted an item
- `wasDestruction` - `true` if the user deleted their item, `false` if they received it
- `defindex` - The definition index of the item that was received/deleted

Emitted when an item broadcast notification is sent. In the official client, the `message` is displayed as a regular pop-up notification box. Currently, this is only used for broadcasting Golden Frying Pan drops/deletions.

### tradeRequest
- `steamID` - A [`SteamID`](https://www.npmjs.com/package/steamid) object of the user who sent a trade request
- `tradeID` - A unique numeric identifier that's used to respond to the request (via `respondToTrade`)

Emitted when someone sends us a trade request. Use `respondToTrade` to accept or decline it.

### tradeResponse
- `response` - The response code. This is a value in the `TradeResponse` enum.
- `tradeID` - If `response` is `TradeResponse.Cancel`, this is the tradeID of the trade request that was canceled.

Emitted when a response is received to a `trade` call, or someone cancels an incoming trade request.

### backpackLoaded

Emitted when the GC has sent us the contents of our backpack. From this point forward, backpack contents are available as a `tf2.backpack` property, which is an array of item objects. The array is in no particular order, use the `position` property of each item to determine its backpack slot.

### accountLoaded

Emitted when the GC has sent us metadata about our account. Right before this is emitted, node-tf2 will define the `premium`, `backpackSlots`, and `canSendProfessorSpeks` properties. This event indicates that those properties are now available.

### accountUpdate

- `oldData` - An object representing the previous value of whatever properties changed

Emitted when the GC notifies us that something about our account has changed. One or more of the `premium`, `backpackSlots`, or `canSendProfessorSpeks` properties will have changed right before this event is emitted. The previous value of whatever properties changed is available via `oldData`.

For example, if our account has just upgraded to premium, this would be `oldData`:

```json
{
	"premium": false,
	"backpackSlots": 50
}
```

The `premium` property of node-tf2 would now be true and the `backpackSlots` property would now be 300.

### itemAcquired
- `item` - The item that was acquired

Emitted when we receive a new item. `item` is the item that we just received, and `tf2.backpack` is updated before the event is emitted.

### itemChanged
- `oldItem` - The old item data
- `newItem` - The new item data

Emitted when an item in our backpack changes (e.g. style update, position changed, etc.).

### itemRemoved
- `item` - The item that was removed

Emitted when an item is removed from our backpack. The `tf2.backpack` property is updated before this is emitted.

### craftingComplete
- `recipe` - The ID of the recipe that was used to perform this craft, or -1 on failure
- `itemsGained` - An array of IDs of items that were gained as a result of this craft

Emitted when a craft initiated by the `craft` method finishes.

### professorSpeksReceived
- `steamID` - A [`SteamID`](https://www.npmjs.com/package/steamid) object of the user who sent us Professor Speks

Emitted when someone else thanks us and sends us Professor Speks (increments our "New Users Helped" counter if we already have them).

### professorSpeksSent

Emitted when we successfully send Professor Speks to someone else.

### createIdentity
- `status` - The status of this request, from the values in the enum below.
- `created` - `true` if the identity was successfully created
- `id` - The ID of the newly-created identity
- `token` - The authentication token of the newly-created identity

Emitted when the GC sends us back the response of a `createServerIdentity()` call. The `status` value will be from the following enum:

	enum EStatus {
		kStatus_GenericFailure = 0;
		kStatus_TooMany = -1;
		kStatus_NoPrivs = -2;
		kStatus_Created = 1;
	}

### registeredServers
- `servers` - An array of objects representing our owned server identities

Emitted when the GC sends us back the response of a `getRegisteredServers()` call. Each item in the `servers` array will be an object that looks like this:

```json
{
	"game_server_account_id": 291516,
	"game_server_identity_token": "T0aK9zQ6W<)FTzt",
	"game_server_standing": 0,
	"game_server_standing_trend": 2
}
```

### resetIdentity
- `reset` - `true` if the token was successfully reset
- `id` - The ID of the identity for which we reset the token
- `token` - The new token associated with the given ID

Emitted when the GC sends us back the response of a `resetServerIdentity(id)` call.

### warStats
- `scores` - An object where the keys are [side indexes](https://github.com/DoctorMcKay/node-tf2/blob/3fa354b2c1224b5885d9b9eb2818d17f76454cd7/enums.js#L82-L85) and values are scores.

Emitted when the GC sends us back the response of a `requestWarStats()` call.
