// імпорт бібліотеки (інстальовано через npm)
// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';

const inputDataTime = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");
const timerEl = document.querySelector(".timer");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

// Вибір кінцевої дати і часу в одному елементі інтерфейсу.
startBtn.disabled = true;
let userSelectedDates = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if ( options.defaultDate >= selectedDates[0]) {
          Notiflix.Notify.failure("Please choose a date in the future")
        } else startBtn.disabled = false;
            userSelectedDates = selectedDates[0];
    },
  };

// Функція для обліку часу
  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }

  let timerId = null;

  startBtn.addEventListener("click", () => {
  timerId = setInterval(() => {
    deltaTime = userSelectedDates - Date.now();
    const time = convertMs(deltaTime);

    updateTimer(time);
  }, 1000);
});

// Виведення часу на екран
function updateTimer ( time ) {
  daysEl.textContent = time.days;
  hoursEl.textContent = time.hours;
  minutesEl.textContent = time.minutes;
  secondsEl.textContent = time.seconds;
  }  
  
  // Форматування часу
  flatpickr(inputDataTime, options)
  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }



