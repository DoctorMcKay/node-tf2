var TeamFortress2 = require('./index.js');

TeamFortress2.GCGoodbyeReason = {
	GC_GOING_DOWN: 1,
	NO_SESSION: 2
};

TeamFortress2.TradeResponse = {
	Accepted: 0,
	Declined: 1,
	TradeBannedInitiator: 2,
	TradeBannedTarget: 3,
	TargetAlreadyTrading: 4,
	Disabled: 5,
	NotLoggedIn: 6,
	Cancel: 7,
	TooSoon: 8,
	TooSoonPenalty: 9,
	ConnectionFailed: 10,
	AlreadyTrading: 11,
	AlreadyHasTradeRequest: 12,
	NoResponse: 13,
	CyberCafeInitiator: 14,
	CyberCafeTarget: 15,
	SchoolLabInitiator: 16,
	SchoolLabTarget: 16,
	InitiatorBlockedTarget: 18,
	InitiatorNeedsVerifiedEmail: 20,
	InitiatorNeedsSteamGuard: 21,
	TargetAccountCannotTrade: 22,
	InitiatorSteamGuardDuration: 23,
	InitiatorPasswordResetProbation: 24,
	InitiatorNewDeviceCooldown: 25,
	OKToDeliver: 50
};

TeamFortress2.Class = {
	Scout: 1,
	Sniper: 2,
	Soldier: 3,
	Demoman: 4,
	Medic: 5,
	Heavy: 6,
	Pyro: 7,
	Spy: 8,
	Engineer: 9
};

TeamFortress2.ItemSlot = {
	Primary: 0,
	Secondary: 1,
	Melee: 2,
	// 3 appears to be unused
	Sapper: 4, // Sapper
	PDA: 5,
	PDA2: 6,
	Cosmetic1: 7,
	Cosmetic2: 8,
	Action: 9,
	Cosmetic3: 10,
	Taunt1: 11,
	Taunt2: 12,
	Taunt3: 13,
	Taunt4: 14,
	Taunt5: 15,
	Taunt6: 16,
	Taunt7: 17,
	Taunt8: 18
};

TeamFortress2.ItemFlags = {
	CannotTrade: (1 << 0),
	CannotCraft: (1 << 1),
	NotEcon: (1 << 3),
	Preview: (1 << 7)
};

TeamFortress2.War = {
	HeavyVsPyro: 0
};

TeamFortress2.HeavyVsPyroWarSide = {
	Heavy: 0,
	Pyro: 1
};
