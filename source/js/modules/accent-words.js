let wrapLetters = (stringBlock) => {
  let words = stringBlock.textContent.split(` `);
  stringBlock.textContent = ``;

  words.forEach((word) => {
    let wordWrapper = document.createElement(`span`);
    let letters = word.split(``);

    letters.forEach((letter) => {
      let letterWrapper = document.createElement(`span`);
      letterWrapper.textContent = letter;
      wordWrapper.append(letterWrapper);
    });
    stringBlock.append(wordWrapper);
  });
};

export default () => {
  document.querySelectorAll(`
        .intro__title,
        .intro__date,
        .slider__item-title,
        .prizes__title,
        .rules__title,
        .game__title
    `).forEach(wrapLetters);
};
