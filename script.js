// global constants
const clueHoldTime = 250; //how long to hold each clue's light/sound
const cluePauseTime = 111; //how long to pause in between clues
const nextClueWaitTime = 500; //how long to wait before starting playback of the clue sequence

//Global Variables
// var tonePlaying = false;
var volume = 0.4; //must be between 0.0 and 1.0
var pattern = [2, 2, 4, 3, 2, 1, 2, 4, 5];
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var guessCounter = 0;
var num = 0;
var lives = 3; 

function startGame() {
  //initialize game variables
  progress = 0;
  guessCounter = 0;
  lives = 3;
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

// Sound Synthesis Functions
const freqMap = {
  1: 261.6256, //middle c
  2: 329.6, // e
  3: 220, // low a
  4: 174.6141, // low f
  5: 195.9977, // low g
  6: 246.9417, // low b
  7: 369.9944, //f sharp
  8: 440.0000, // a
};

function playTone(btn, len) {
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  tonePlaying = true;
  setTimeout(function() {
    stopTone();
  }, len);
}

function startTone(btn) {
  if (!tonePlaying) {
    o.frequency.value = freqMap[btn];
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
  for (let i = 0; i <= progress; i++) {
    // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i]); // set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime;
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
  if (btn == pattern[guessCounter]) {
    guessCounter++;
    if (guessCounter == 8) {
      winGame();
    } 
    else if(progress == guessCounter) {
      playClueSequence();
    }
  } else if (lives > 0) {
    lives--;
    alert("You have " + lives + " lives left!")
    progress--;
    playClueSequence();
  }
  else {
    loseGame(); 
  }
}
