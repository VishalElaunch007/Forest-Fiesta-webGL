
const PlayListener = {
    Name: "",
    OnGamePause: "",
    OnGameResume: "",
};

function SetPlayListener(name, GamePause, GameResume) {
    PlayListener.Name = name;
    PlayListener.OnGamePause = GamePause;
    PlayListener.OnGameResume = GameResume;
}

var isGameStarted = false;

// ---------------- Unity Callbacks ----------------
function FullScreenExited() {
    console.warn('Exited fullscreen mode!');

    FullScreenState = 0;

    if (gameInstance != null) {
        gameInstance.SendMessage(PlayListener.Name, PlayListener.OnGamePause);
    }
}
function FullScreenEntered() {
    if (FullScreenState == 1) return;

    console.log('Enterd Fullscreen mode!');

    FullScreenState = 1;

    if (gameInstance != null) {
        gameInstance.SendMessage(PlayListener.Name, PlayListener.OnGameResume);
    }
}
// -------------------------------------------------


// ---------Android Callbacks--------------------------------
function AndroidInit() {
    
    if (typeof (AndroidCallback) != 'undefined') {
        console.info('Android game start Call back');

        var Orientation = GameOrientation == "portrait" ? "P" : "L";

        //console.log(Orientation);
        AndroidCallback.onCallback(Orientation);
        FullScreenEntered();
    }
}


//NOTE: Do not change function name here
function AndroidMessage(data) {

    console.info('Android Message: ' + data);

    switch (data) {
        case "pause":
            if (typeof (AndroidCallback) != 'undefined') {
                FullScreenState = 0;
                ManageScreen();
            }
            break;
        default:
            console.log(`Android Message "${data}" is not define!`);
            break;
    }
}

function AndroidvisibilityChange() {

    //console.log("AndroidvisibilityChange")

    if (document.hidden) {
        if (gameInstance) {
            gameInstance.SendMessage(PlayListener.Name, PlayListener.OnGamePause);
        }
    }
    else {
        if (gameInstance) {
            if (!IsAdsRunning && FullScreenState == 1)
            {
               // console.log("AndroidvisibilityChange: Ads Not Running ");
                gameInstance.SendMessage(PlayListener.Name, PlayListener.OnGameResume);
            }
        }
    }
}
// ----------------------------------------------------------


// =================== Load Game ============================
function LoadUnityGame() {

    FullScreen();
    AndroidInit();

    if (isGameStarted == false) {
        loadGame();
        isGameStarted = true;
    }

    document.getElementById("unity-container").style.display = "block";
    document.getElementById("StartGame").style.display = "none";

    LockDevice();

}

function FullScreen() {
    let de = document.documentElement;
    if (de.requestFullscreen) { de.requestFullscreen(); }
    else if (de.mozRequestFullScreen) { de.mozRequestFullScreen(); }
    else if (de.webKitRequestFullscreen) { de.webKitRequestFullscreen(); }
    else if (de.msRequestFullscreen) { de.msRequestFullscreen(); }
}
function LockDevice() {

    if ('orientation' in screen && 'lock' in screen.orientation) {
        // Check if screen.orientation.lock() is supported
        screen.orientation.lock(GameOrientation).then(function () {
            console.log('Screen orientation locked!');
        }).catch(function (error) {
            console.warn('Failed to lock screen orientation:', error);
        });
    }
    else {
        console.warn('Screen orientation locking not supported on this device');
    }
}
function PlayNowBtnClick() {
    
   LoadUnityGame();
}
function ResumeBtnClick() {

    FullScreen();
    LockDevice();

    document.getElementById("unity-container").style.display = "block";
    document.getElementById("FullScreen").style.display = "none";

    FullScreenEntered();
}

function FullScreenViewEvent() {
    //console.log("FullScreenViewEvent Fired!");

    if (document.fullscreenElement == null) {

        FullScreenExited();

        if ((screen.orientation.type == "landscape-primary" || screen.orientation.type == "portrait-primary") && isGameStarted == true) {
            document.getElementById("FullScreen").style.display = "flex";
            document.getElementById("unity-container").style.display = "none";
        }
    } else {
        FullScreenEntered();
    }
}


function ManageScreen() {

    //console.log("ManageScreen");

    if (IsAdsRunning) {
        //console.info("ManageScreen: Ads Running");
        ShouldExitNext = true;
    }
    else {
       //console.info("ManageScreen: Ads Not Running");
        FullScreenExited();

        if ((screen.orientation.type == "landscape-primary"
            || screen.orientation.type == "portrait-primary")
            && isGameStarted == true) {
            document.getElementById("FullScreen").style.display = "flex";
            document.getElementById("unity-container").style.display = "none";
        }
        ShouldExitNext = false;
    }
}
