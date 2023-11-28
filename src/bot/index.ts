import SteamUser from "steam-user";
import SteamCommunity from "steamcommunity";
import TradeOfferManager from "steam-tradeoffer-manager";
import { CallbackOffer, LogOnBotTypes } from "../types/botTypes";
//prettier-ignore
class SteamBot {
  client: SteamUser
  community: SteamCommunity
  manager: TradeOfferManager
	constructor(logOnOptions: LogOnBotTypes) {
		this.client = new SteamUser();
		this.community = new SteamCommunity();
		this.manager = new TradeOfferManager({
			steam: this.client,
			community: this.community,
			language: "en",
		});

		this.logOn(logOnOptions);
	}

	logOn(logOnOptions: LogOnBotTypes) {
		this.client.logOn(logOnOptions);

    this.client.on('loggedOn', () => {
      console.log(`Logged in ${this.client.steamID}`)

      this.client.setPersona(SteamUser.EPersonaState.Online)
      this.client.gamesPlayed(730)
    })

    this.client.on('webSession', (sessionid, cookies) => {
      this.manager.setCookies(cookies)
      this.community.setCookies(cookies)
    })
	}

  sendSkinToUser(partner: string, assetid: string, callback: (err: CallbackOffer, status: boolean, offerId?: string) => void) {
    const offer = this.manager.createOffer(partner)

    this.manager.getUserInventoryContents(partner, 730, 2, true, (err, inv) => {
      if(err) {
        console.log(err)
      } else {
        const item = inv.find(item => assetid == item.assetid)

        if(item) {
          offer.addMyItem(item)
          offer.setMessage('Thank You for using Skins Mania!')
          offer.send((err, status) => {
              callback(err, (status === 'sent' || status === 'pending'), offer.id)
          })
        } else {
          callback(new Error('Could not find item'), false)
        }
      }
    })
  }

}

export { SteamBot };
