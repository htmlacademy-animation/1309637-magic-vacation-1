export default () => {
  const MAX_TIME = 300000;
  const FPS_INTERVAL = 1000;
  const DEFAULT_VALUE = `00`;
  const GAME_HASH = `#game`;

  const resultScreens = document.querySelectorAll(`.screen--result`);
  const minutesCounter = document.querySelector(`.game__counter-minutes`);
  const secondsCounter = document.querySelector(`.game__counter-seconds`);
  const resetButton = document.querySelector(`.result__button`);
  const startButton = document.querySelector(`.rules__link`);
  const navGameLink = document.querySelector(`.js-menu-link[href="${GAME_HASH}"]`);

  const draw = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    minutesCounter.textContent = minutes < 10 ? `0${minutes}` : minutes;
    secondsCounter.textContent = seconds < 10 ? `0${seconds}` : seconds;
  };

  const run = () => {
    let requestId;
    let now;
    let diff;
    let then = Date.now();
    let start = Date.now();
    let elapsed;

    const tick = () => {
      requestId = requestAnimationFrame(tick);

      now = Date.now();
      elapsed = now - then;
      diff = now - start;

      if (elapsed > FPS_INTERVAL) {
        then = now - (elapsed % FPS_INTERVAL);
        draw(diff);
      }

      if (
        diff > MAX_TIME ||
        window.location.hash !== GAME_HASH ||
        Array.from(resultScreens).some((el) => el.classList.contains(`screen--show`))
      ) {
        cancelAnimationFrame(requestId);
        minutesCounter.textContent = DEFAULT_VALUE;
        secondsCounter.textContent = DEFAULT_VALUE;
      }
    };
    requestId = requestAnimationFrame(tick);
  };

  if (window.location.hash === GAME_HASH) {
    run();
  }

  resetButton.addEventListener(`click`, run);
  startButton.addEventListener(`click`, run);
  navGameLink.addEventListener(`click`, run);
};
