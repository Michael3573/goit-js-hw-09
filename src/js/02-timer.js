import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.startBtn.disabled = true;

const DELAY = 1000;

let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    const diffData = selectedDate - Date.now();
    if (diffData <= 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
    }
  },
};
flatpickr('#datetime-picker', options);

function onStartBtnClick() {
  refs.startBtn.disabled = true;

  const interval = setInterval(() => {
    let diffData = selectedDate - Date.now();
    if (diffData >= 0) {
      const { days, hours, minutes, seconds } = convertMs(diffData);

      refs.days.textContent = days;
      refs.hours.textContent = hours;
      refs.minutes.textContent = minutes;
      refs.seconds.textContent = seconds;
    } else {
      clearInterval(interval);
    }
  }, DELAY);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
