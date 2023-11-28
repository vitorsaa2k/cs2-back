import TradeOfferManager from "steam-tradeoffer-manager";

type LogOnBotTypes = {
	accountName: string;
	password: string;
	twoFactorCode: string;
};

type CallbackOffer =
	| (Error & {
			eresult?: TradeOfferManager.EResult;
			cause?:
				| "TradeBan"
				| "NewDevice"
				| "TargetCannotTrade"
				| "OfferLimitExceeded"
				| "ItemServerUnavailable";
	  })
	| null;

export { LogOnBotTypes, CallbackOffer };
