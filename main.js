import "./style.css";
import getRandomWord from "./src/randomWord.js";
import { setSharkImage } from "./src/sharkImage.js";
import { setupWord, isLetterInWord, revealLetterInWord } from "./src/word";
import setupGuesses from "./src/guess";

document.querySelector("#app").innerHTML = `
  <section id="shark-img"></section>

  <section id="game-status"></section>

  <section id="word-container"></section>

  <section id="letter-buttons"></section>
`;
let numWrong = 0;

let sharkImgEl = document.querySelector('#shark-img');
const handleGuess = (guessEvent, letter) => {
  // Disable button after click
  const button = guessEvent.target;
  button.setAttribute("disabled", true);

  // Handle correct/incorrect guess
  if (isLetterInWord(letter)) {
    revealLetterInWord(letter);
  } else {
    numWrong += 1;
    setSharkImage(sharkImgEl, numWrong);
  }
  if (checkWin()) {
    alert("You Won!");
    disable_buttons();
  }
  if (numWrong > 5) {
    alert("You Lose!");
    disable_buttons();
  }
};

function checkWin() {
  return Array.from(document.querySelectorAll(".letter-box")).every(
    (el) => el.innerText !== ""
  );
}

function disable_buttons() {
  document.querySelectorAll("button").forEach((btn) => {
    btn.setAttribute("disabled", true);
  });
}
const initSharkwords = () => {
  const word = getRandomWord();
  setupWord(word, document.querySelector("#word-container"));
  setSharkImage(document.querySelector("#shark-img"), numWrong);
  setupGuesses(document.querySelector("#letter-buttons"), handleGuess);
  console.log("Win?", checkWin());

  // for debugging:
  console.log(`[INFO] Correct word is: ${word}`);
};

initSharkwords();
