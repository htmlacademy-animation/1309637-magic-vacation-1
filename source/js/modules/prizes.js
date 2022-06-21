export default () => {
  const prizesMenuButton = document.querySelector(`.js-menu-link[data-href="prizes"]`);
  const prizesList = document.querySelectorAll(`.prizes__list .prizes__icon`);

  prizesMenuButton.addEventListener(`click`, (evt) => {
    if (evt.target.classList.contains(`active`)) {
      return;
    }

    const icons = [
      document.querySelector(`#prize-icon-1`).cloneNode(true),
    ];

    // prizesList.forEach((el, i) => {
    //   el.textContent = '';
    //   el.append(icons[i]);
    // });
    prizesList[0].textContent = ``;
    prizesList[0].append(icons[0]);
  });
};
