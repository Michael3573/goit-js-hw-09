const Change_Color = 1000;
let intId = null;

const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};
refs.stop.disabled = true;

refs.start.addEventListener('click', onStartChangeColor);
refs.stop.addEventListener('click', onStopChangeColor);

function onStartChangeColor() {
  refs.start.disabled = true;
  refs.stop.disabled = false;

  intId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, Change_Color);
}

function onStopChangeColor() {
  refs.start.disabled = false;
  refs.stop.disabled = true;
  clearInterval(intId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
