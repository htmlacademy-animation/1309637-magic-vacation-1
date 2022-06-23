export default () => {
  const DELAY = 200;
  const prizesMenuButton = document.querySelector(`.js-menu-link[data-href="prizes"]`);
  const prizesList = document.querySelectorAll(`.prizes__list .prizes__icon`);

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
    }, DELAY);
  };

  insertIcons();
  prizesMenuButton.addEventListener(`click`, (evt) => {
    if (evt.target.classList.contains(`active`)) {
      return;
    }
    insertIcons();
  });
};
