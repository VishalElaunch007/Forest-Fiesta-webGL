

const AdsListener =
{
	Name: "",
	beforeAdCallback: "",
	afterAdCallback: "",
	adViewedResultCallback: "",
	adBreakDoneCallback: "",
	adsBlockedCallback: ""
};

function SetAdsListener(GoogleAdsManager, beforeAd, afterAd, adViewedResult, adBreakDone, adsBlocked) {

	AdsListener.Name = GoogleAdsManager;
	AdsListener.beforeAdCallback = beforeAd;
	AdsListener.afterAdCallback = afterAd;
	AdsListener.adViewedResultCallback = adViewedResult;
	AdsListener.adBreakDoneCallback = adBreakDone;
	AdsListener.adsBlockedCallback = adsBlocked;
}



function ShowStartAd() {

	IsAdsRunning = true;
		
	if (AdsBlocked == 1)
	{
		console.warn("Ads Blocker is enabled! Can't show ads")

		gameInstance.SendMessage(AdsListener.Name, AdsListener.adsBlockedCallback);
	}
	// Check if Ad was displayed by google or not
	var AdDisplayed = 0;

	adBreak({
		type: 'start',
		name: 'start_ad',
		beforeAd: () => {
			// Mute the game and pause gameplay.
			console.info("beforeAd()");
			gameInstance.SendMessage(AdsListener.Name, AdsListener.beforeAdCallback);

		},
		afterAd: () => {
			// Unmute the game and resume gameplay.
			AdDisplayed = 1; // Ad Displayed
			console.info("afterAd()");

			gameInstance.SendMessage(AdsListener.Name, AdsListener.afterAdCallback);
			if (FullScreenState == 0) {
				FullScreenExited();
			}
		},
		adBreakDone: () => {
			// Log analytics or perform other actions after the ad break.
			console.info("adBreakDone()" + `\n Google Ads: ${AdDisplayed==1}`);

			IsAdsRunning = false;
			gameInstance.SendMessage(AdsListener.Name, AdsListener.adBreakDoneCallback, AdDisplayed);

			if (ShouldExitNext) {

				//console.log("ShouldExitNext!!!");

				ManageScreen();
				ShouldExitNext = false;
            }

		}
	});
}
function ShowNextAd() {

	IsAdsRunning = true;


	if(AdsBlocked == 1)
	{

		console.warn("Ads Blocker is enabled! Can't show ads")

		gameInstance.SendMessage(AdsListener.Name, AdsListener.adsBlockedCallback);
	}


	// Check if Ad was displayed by google or not
	var AdDisplayed = 0;

	adBreak({
		type: 'next',
		name: 'level_next_ad',
		beforeAd: () => {
			// Mute the game and pause gameplay.
			console.info("beforeAd()");

			gameInstance.SendMessage(AdsListener.Name, AdsListener.beforeAdCallback);

		},
		afterAd: () => {
			// Unmute the game and resume gameplay.

			AdDisplayed = 1; // Ad Displayed
			console.info("afterAd()");
			gameInstance.SendMessage(AdsListener.Name, AdsListener.afterAdCallback);
			if (FullScreenState == 0) {
				FullScreenExited();
			}

		},
		adBreakDone: () => {
			// Log analytics or perform other actions after the ad break.
			console.info("adBreakDone()" + `\n Google Ads: ${AdDisplayed==1}`);
			IsAdsRunning = false;

			gameInstance.SendMessage(AdsListener.Name, AdsListener.adBreakDoneCallback, AdDisplayed);
			if (ShouldExitNext) {

				//console.log("ShouldExitNext!!!");

				ManageScreen();
				ShouldExitNext = false;
			}
		}
	});
}
function ShowBrowseAd() {

	IsAdsRunning = true;

	if(AdsBlocked == 1)
	{

		console.warn("Ads Blocker is enabled! Can't show ads")

		gameInstance.SendMessage(AdsListener.Name, AdsListener.adsBlockedCallback);
	}

	// Check if Ad was displayed by google or not
	var AdDisplayed = 0;

	adBreak({
		type: 'browse',
		name: 'browse_ad',
		beforeAd: () => {
			// Mute the game and pause gameplay.
			console.info("beforeAd()");

			gameInstance.SendMessage(AdsListener.Name, AdsListener.beforeAdCallback);

		},
		afterAd: () => {
			// Unmute the game and resume gameplay.

			AdDisplayed = 1; // Ad Displayed
			console.info("afterAd()");
			gameInstance.SendMessage(AdsListener.Name, AdsListener.afterAdCallback);
			if (FullScreenState == 0) {
				FullScreenExited();
			}

		},
		adBreakDone: () => {
			// Log analytics or perform other actions after the ad break.
			console.info("adBreakDone()" + `\n Google Ads: ${AdDisplayed==1}`);
			
			IsAdsRunning = false;

			gameInstance.SendMessage(AdsListener.Name, AdsListener.adBreakDoneCallback, AdDisplayed);

			if (ShouldExitNext) {
				//console.log("ShouldExitNext!!!");
				ManageScreen();
				ShouldExitNext = false;
			}
		}
	});
}
function ShowPrerollAd() {

	IsAdsRunning = true;

	if(AdsBlocked == 1)
	{
		console.warn("Ads Blocker is enabled! Can't show ads")
		
		LoadUnityGame();
	}

	adBreak({
		type: 'preroll',
		adBreakDone: (placementInfo) => {

			// Log analytics or perform other actions after the ad break.
			console.log("adBreakDone (JS)");
			IsAdsRunning = false;

			LoadUnityGame();
		}
	});
}

function CheckPrerollDone(){
	if (gameInstance != null)
	{
		gameInstance.SendMessage(PrerollListener.Name, PrerollListener.checkPreroll, PrerollDone? 1 : 0);
	}
}

function ShowPauseAd() {

	IsAdsRunning = true;

	if(AdsBlocked == 1)
	{

		console.warn("Ads Blocker is enabled! Can't show ads")

		gameInstance.SendMessage(AdsListener.Name, AdsListener.adsBlockedCallback);
	}
	// Check if Ad was displayed by google or not
	var AdDisplayed = 0;

	adBreak({
		type: 'pause',
		name: 'pause_ad',
		beforeAd: () => {
			// Mute the game and pause gameplay.
			console.info("beforeAd()");

			gameInstance.SendMessage(AdsListener.Name, AdsListener.beforeAdCallback);

		},
		afterAd: () => {
			// Unmute the game and resume gameplay.

			AdDisplayed = 1; // Ad Displayed
			console.info("afterAd()");
			gameInstance.SendMessage(AdsListener.Name, AdsListener.afterAdCallback);
			if (FullScreenState == 0) {
				FullScreenExited();
			}
		},
		adBreakDone: () => {
			// Log analytics or perform other actions after the ad break.

			console.info("adBreakDone()" + `\n Google Ads: ${AdDisplayed==1}`);
			IsAdsRunning = false;

			gameInstance.SendMessage(AdsListener.Name, AdsListener.adBreakDoneCallback, AdDisplayed);
			if (ShouldExitNext) {

				//console.log("ShouldExitNext!!!");

				ManageScreen();
				ShouldExitNext = false;
			}
		}
	});
}
function ShowRewardAd() {

	IsAdsRunning = true;

	if(AdsBlocked == 1)
	{

		console.warn("Ads Blocker is enabled! Can't show ads")

		gameInstance.SendMessage(AdsListener.Name, AdsListener.adsBlockedCallback);
	}

	var AdDisplayed = 0;

	adBreak({
		type: 'reward',                      			// The type of this placement
		name: 'give_reward_ad',                      // A descriptive name for this placement
		beforeReward: (showAdFn) => {
			// Show reward prompt (call showAdFn() if clicked)
			showAdFn();
			console.info("showAdFn()")
		},
		beforeAd: () => {
			// Prepare for the ad. Mute and pause the game flow
			console.info("beforeAd()");
			gameInstance.SendMessage(AdsListener.Name, AdsListener.beforeAdCallback);


		},
		afterAd: () => {
			// Resume the game and re-enable sound

			AdDisplayed = 1; // Ad Displayed
			console.info("afterAd()");
			gameInstance.SendMessage(AdsListener.Name, AdsListener.afterAdCallback);


			if (FullScreenState == 0) {
				FullScreenExited();
			}

		},

		adDismissed: () => {
			// Player dismissed the ad before it finished.
			console.info("adDismissed()");

			gameInstance.SendMessage(AdsListener.Name, AdsListener.adViewedResultCallback, 0);

		},
		adViewed: () => {
			// Player watched the ad–give them the reward.
			console.info("adViewed()");

			gameInstance.SendMessage(AdsListener.Name, AdsListener.adViewedResultCallback, 1);

		},
		adBreakDone: () => {
			// Always called (if provided) even if an ad didn't show
			console.info("adBreakDone()" + `\n Google Ads: ${AdDisplayed==1}`);
			IsAdsRunning = false;

			gameInstance.SendMessage(AdsListener.Name, AdsListener.adBreakDoneCallback, AdDisplayed);

			if (ShouldExitNext) {

				//console.log("ShouldExitNext!!!");

				ManageScreen();
				ShouldExitNext = false;
			}
		},
	});
}
