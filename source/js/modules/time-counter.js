export default () => {
  const MAX_TIME = 300000;
  const FPS_INTERVAL = 1000;
  const MS_PER_MIN = 60000;
  const MS_PER_SEC = 1000;
  const DEFAULT_MINUTES = `05`;
  const DEFAULT_SECONDS = `00`;
  const GAME_HASH = `#game`;

  const resultScreens = document.querySelectorAll(`.screen--result`);
  const minutesCounter = document.querySelector(`.game__counter-minutes`);
  const secondsCounter = document.querySelector(`.game__counter-seconds`);
  const resetButton = document.querySelector(`.result__button`);
  const startButton = document.querySelector(`.rules__link`);
  const navGameLink = document.querySelector(`.js-menu-link[href="${GAME_HASH}"]`);

  const draw = (time) => {
    const minutes = Math.floor((time + MS_PER_SEC) / MS_PER_MIN);
    const seconds = Math.floor((time + MS_PER_SEC) / MS_PER_SEC % 60);

    const currentMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const currentSeconds = seconds < 10 ? `0${seconds}` : seconds;

    minutesCounter.textContent = currentMinutes;
    secondsCounter.textContent = currentSeconds;
  };

  const run = () => {
    let requestId;
    let now;
    let diff;
    let then = Date.now();
    let start = Date.now();
    let elapsed;

    minutesCounter.textContent = DEFAULT_MINUTES;
    secondsCounter.textContent = DEFAULT_SECONDS;

    const tick = () => {
      requestId = requestAnimationFrame(tick);

      now = Date.now();
      elapsed = now - then;
      diff = MAX_TIME - (now - start);

      if (elapsed > FPS_INTERVAL) {
        then = now - (elapsed % FPS_INTERVAL);
        draw(diff);
      }

      if (
        diff <= 0 ||
        window.location.hash !== GAME_HASH ||
        Array.from(resultScreens).some((el) => el.classList.contains(`screen--show`))
      ) {
        cancelAnimationFrame(requestId);
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
