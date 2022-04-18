export default () => {
  let bodyElement = document.querySelector(`body`);
  let onWindowLoad = function () {
    bodyElement.classList.add(`is-loaded`);
  };
  window.addEventListener(`load`, onWindowLoad);
};
