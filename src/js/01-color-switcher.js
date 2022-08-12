function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
const bodyEl = document.querySelector("body");

let timerId = null;
const changeColor = () => {
    timerId = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor();
       }, 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }

startBtn.addEventListener("click", changeColor);
stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
    stopBtn.disabled = true;
    startBtn.disabled = false;
  });




