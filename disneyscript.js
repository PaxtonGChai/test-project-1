// global constants
const clueHoldTime = 250; //how long to hold each clue's light/sound
const cluePauseTime = 111; //how long to pause in between clues
const nextClueWaitTime = 500; //how long to wait before starting playback of the clue sequence

//Global Variables
// var tonePlaying = false;
var volume = 0.4; //must be between 0.0 and 1.0
var canYoupattern = [8, 7, 2, 8, 7, 1, 6, 3, 1, 5, 7, 2];
var wholePattern = [7, 5, 4, 8, 7, 5, 4, 8, 2, 5, 7, 7];
var arielPattern = [1, 2, 7, 7, 2, 7, 5, 5, 1, 2, 7, 7, 2, 7, 2, 7, 5, 5];
var rapunzPattern = [6, 4, 8, 2, 5, 8, 4, 6, 7, 7, 2, 5, 3, 1, 1, 5, 7, 7, 2];
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var guessCounter = 0;
var num = 0;
var lives = 3;
var cont = 0;
var rand = 0;
var choice = 0;

function startGame() {
  //initialize game variables
  progress = 0;
  guessCounter = 0;
  lives = 3;
  rand = Math.floor(Math.random() * Math.floor(4));
  if (rand == 0) {
    cont = 12;
  } else if (rand == 1) {
    cont = 12;
  } else if (rand == 2) {
    cont = 18;
  } else {
    cont = 19;
  }
  gamePlaying = true;
  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  playClueSequence();
}

function stopGame() {
  //changes game variables
  gamePlaying = false;
  document.getElementById("stopBtn").classList.add("hidden");
  document.getElementById("startBtn").classList.remove("hidden");
}

const lion_geniefreqMap = {
  1: 293.6648, //d
  2: 329.6, // e
  3: 220, // low a
  4: 493.8833, // high b
  5: 391.9954, // g
  6: 246.9417, // low b
  7: 369.9944, //f sharp
  8: 440.0 // a
};

const ariel_rapunzfreqMap = {
  1: 293.6648, //d / a
  2: 329.6, // e / a
  3: 261.6256, //middle c
  4: 493.8833, // high b
  5: 391.9954, // g / a
  6: 523.2511, // high C
  7: 349.2282, //f / a
  8: 440.0 // a
};

function playTone(btn, len) {
  if (rand > 1) {
    o.frequency.value = ariel_rapunzfreqMap[btn];
  } else {
    o.frequency.value = lion_geniefreqMap[btn];
  }
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  tonePlaying = true;
  setTimeout(function() {
    stopTone();
  }, len);
}

function startTone(btn) {
  if (!tonePlaying) {
    if (rand > 1) {
      o.frequency.value = ariel_rapunzfreqMap[btn];
    } else {
      o.frequency.value = lion_geniefreqMap[btn];
    }
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    tonePlaying = true;
  }
}

function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);

function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}

function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}

function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

function playClueSequence() {
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  if (rand == 0) {
    for (let i = 0; i <= progress; i++) {
      // for each clue that is revealed so far
      console.log(
        "play single clue: " + canYoupattern[i] + " in " + delay + "ms"
      );
      setTimeout(playSingleClue, delay, canYoupattern[i]); // set a timeout to play that clue
      delay += clueHoldTime;
      delay += cluePauseTime;
    }
  } else if (rand == 1) {
    for (let i = 0; i <= progress; i++) {
      // for each clue that is revealed so far
      console.log(
        "play single clue: " + wholePattern[i] + " in " + delay + "ms"
      );
      setTimeout(playSingleClue, delay, wholePattern[i]); // set a timeout to play that clue
      delay += clueHoldTime;
      delay += cluePauseTime;
    }
  } else if (rand == 2) {
    for (let i = 0; i <= progress; i++) {
      // for each clue that is revealed so far
      console.log(
        "play single clue: " + arielPattern[i] + " in " + delay + "ms"
      );
      setTimeout(playSingleClue, delay, arielPattern[i]); // set a timeout to play that clue
      delay += clueHoldTime;
      delay += cluePauseTime;
    }
  } else {
    for (let i = 0; i <= progress; i++) {
      // for each clue that is revealed so far
      console.log(
        "play single clue: " + rapunzPattern[i] + " in " + delay + "ms"
      );
      setTimeout(playSingleClue, delay, rapunzPattern[i]); // set a timeout to play that clue
      delay += clueHoldTime;
      delay += cluePauseTime;
    }
  }
  progress++;
}

function loseGame() {
  stopGame();
  alert("Game Over. You lost.");
}

function winGame() {
  stopGame();
  alert("YOU WON!");
  var name = prompt(
    "Guess the song! \nMake sure you format it right! \nAll words are capitalized and NO EXTRA SPACES! \nEx: Go The Distance, Let It Go"
  );
  if (rand == 0) {
    if (name.localeCompare("Can You Feel The Love Tonight") == 0) {
      alert("GOOD JOB! YOU SUPER WIN! HAKUNA MATATA! You get BUGS TO EAT!");
    } else {
      alert("The song was Can You Feel The Love Tonight!");
    }
  } else if (rand == 1) {
    if (name.localeCompare("A Whole New World") == 0) {
      alert("GOOD JOB! YOU SUPER WIN! You get three wishes!");
    } else {
      alert("The song was A Whole New World!");
    }
  } else if (rand == 2) {
    if (name.localeCompare("Part Of Your World") == 0) {
      alert("GOOD JOB! YOU SUPER WIN! You get the trident of King Neptune!");
    } else {
      alert("The song was Part Of Your World!");
    }
  } else {
    if (name.localeCompare("I See The Light") == 0) {
      alert("GOOD JOB! YOU SUPER WIN! You get Magical Hair!");
    } else {
      alert("The song was I See The Light!");
    }
  }
}

function guess(btn) {
  console.log("user guessed: " + btn);
  if (!gamePlaying) {
    return;
  }
  guessCheck(btn);
}
// add game logic here
function guessCheck(btn) {
  if (rand == 0) {
    choice = canYoupattern[guessCounter];
  } else if (rand == 1) {
    choice = wholePattern[guessCounter];
  } else if (rand == 2) {
    choice = arielPattern[guessCounter];
  } else {
    choice = rapunzPattern[guessCounter];
  }
  if (btn == choice) {
    guessCounter++;
    if (guessCounter >= cont) {
      winGame();
    } else if (progress == guessCounter) {
      playClueSequence();
    }
  } else if (lives > 0) {
    lives--;
    alert("You have " + lives + " lives left!");
    progress--;
    playClueSequence();
  } else {
    loseGame();
  }
}

