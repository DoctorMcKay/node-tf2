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