import {runCounter, drawCases, drawCodes, resetCounters} from './prizes-counters';

export default () => {
  const INSERT_DELAY = 200;
  const CASES_COUNTER_DELAY = 4000;
  const CODES_COUNTER_DELAY = 5000;
  const PRIZES_HASH = `#prizes`;

  const prizesMenuButton = document.querySelector(`.js-menu-link[data-href="prizes"]`);
  const prizesList = document.querySelectorAll(`.prizes__list .prizes__icon`);

  let casesTimeoutId;
  let codesTimeoutId;

  const insertIcons = () => {
    const icons = [
      document.querySelector(`#prize-icon-1`).cloneNode(true),
      document.querySelector(`#prize-icon-2`).cloneNode(true),
      document.querySelector(`#prize-icon-3`).cloneNode(true),
    ];

    prizesList.forEach((el) => {
      el.textContent = ``;
    });

    setTimeout(() => {
      prizesList.forEach((el, i) => {
        el.append(icons[i]);
      });
    }, INSERT_DELAY);
  };

  const drawCounters = () => {
    if (casesTimeoutId) {
      clearTimeout(casesTimeoutId);
    }
    if (codesTimeoutId) {
      clearTimeout(codesTimeoutId);
    }
    resetCounters();

    casesTimeoutId = setTimeout(() => {
      runCounter(drawCases);
    }, CASES_COUNTER_DELAY);

    codesTimeoutId = setTimeout(() => {
      runCounter(drawCodes);
    }, CODES_COUNTER_DELAY);
  };

  insertIcons();
  if (window.location.hash === PRIZES_HASH) {
    drawCounters();
  }
  prizesMenuButton.addEventListener(`click`, (evt) => {
    if (evt.target.classList.contains(`active`)) {
      return;
    }
    insertIcons();
    drawCounters();
  });
};
