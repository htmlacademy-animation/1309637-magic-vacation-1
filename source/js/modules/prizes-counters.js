const CASES_START = 1;
const CASES_FINISH = 7;
const CODES_START = 11;
const CODES_FINISH = 900;
const COUNTER_TIME = 500;
const FPS_INTERVAL = 12;

const casesContainer = document.querySelector(`.prizes__item--cases .prizes__desc-counter`);
const codesContainer = document.querySelector(`.prizes__item--codes .prizes__desc-counter`);

export const resetCounters = () => {
  casesContainer.textContent = CASES_START;
  codesContainer.textContent = CODES_START;
};

export const drawCases = (time) => {
  const currentNumber = Math.floor(((CASES_FINISH - CASES_START) / COUNTER_TIME) * time + CASES_START);
  if (currentNumber > CASES_FINISH) {
    casesContainer.textContent = CASES_FINISH;
    return;
  }
  casesContainer.textContent = currentNumber;
};

export const drawCodes = (time) => {
  const currentNumber = Math.floor(((CODES_FINISH - CODES_START) / COUNTER_TIME) * time + CODES_START);
  if (currentNumber > CODES_FINISH) {
    codesContainer.textContent = CODES_FINISH;
    return;
  }
  codesContainer.textContent = currentNumber;
};

export const runCounter = (draw) => {
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

    if (diff > COUNTER_TIME) {
      cancelAnimationFrame(requestId);
    }
  };
  requestId = requestAnimationFrame(tick);
};
