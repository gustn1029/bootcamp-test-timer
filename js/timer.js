const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const startBtn = document.querySelector(".start__btn");
const pauseBtn = document.querySelector(".pause__btn");
const resetBtn = document.querySelector(".reset__btn");
let isPause = false;
let time = 0;
let interval;
const inputArr = [hoursInput, minutesInput, secondsInput];

inputArr.forEach((el) => {
  el.addEventListener("input", (e) => {
    if (e.target.value !== "") {
      e.target.parentNode.classList.add("after-hidden");
      startBtn.classList.add("active");
      resetBtn.classList.add("active");
    } else {
      e.target.parentNode.classList.remove("after-hidden");
    }
    if (e.target.value.length > 2) {
      e.target.value = e.target.value.slice(0, 2);
    }
  });
});

const startTimer = () => {
  if (isPause) {
    isPause = false;
  } else {
    startBtn.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    time = hours * 3600 + minutes * 60 + seconds;
  }

  inputArr.forEach((el) => {
    el.parentNode.classList.add("after-hidden");
  });

  if (time > 0) {
    clearInterval(interval);

    interval = setInterval(() => {
      if (time > 0) {
        time--;

        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        if (hours > 0) {
          hoursInput.value = hours < 10 ? `0${hours}` : hours;
        } else {
          hoursInput.value = "00";
        }

        if (minutes > 0) {
          minutesInput.value = minutes < 10 ? `0${minutes}` : minutes;
        } else {
          minutesInput.value = "00";
        }

        secondsInput.value = seconds < 10 ? `0${seconds}` : seconds;

        if (time === 0) {
          secondsInput.value = "00";
          clearInterval(interval);
          startBtn.classList.remove("active");
          resetBtn.classList.remove("active");

          inputArr.forEach((el) => {
            el.parentNode.classList.remove("after-hidden");
          });
        }
      }
    }, 1000);
  }
};

const pauseTimer = () => {
  clearInterval(interval);
  isPause = true;
  interval = null;
  startBtn.classList.remove("hidden");
  pauseBtn.classList.add("hidden");
};

const resetTimer = () => {
  time = 0;
  inputArr.forEach((el) => {
    el.parentNode.classList.remove("after-hidden");
    el.value = "";
  });

  if (isPause) {
    isPause = false;
  }
  startBtn.classList.contains("hidden") && startBtn.classList.remove("hidden");

  startBtn.classList.remove("active");
  pauseBtn.classList.add("hidden");
  resetBtn.classList.remove("active");
};

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
