import throttle from 'lodash/throttle';

const ScreenNumber = {
  TOP: 0,
  STORY: 1,
  PRIZES: 2,
  RULES: 3,
  GAME: 4,
};

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 1000;
    this.CURTAIN_TIMEOUT = 300;
    this.scrollFlag = true;
    this.timeout = null;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);
    this.curtainElement = document.querySelector(`.screen__curtain`);
    this.bodyElement = document.querySelector(`body`);

    this.activeScreen = 0;
    this.prevScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    if (this.scrollFlag) {
      this.reCalculateActiveScreenPosition(evt.deltaY);
      const currentPosition = this.activeScreen;
      if (currentPosition !== this.activeScreen) {
        this.changePageDisplay();
      }
    }
    this.scrollFlag = false;
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.scrollFlag = true;
    }, this.THROTTLE_TIMEOUT);
  }

  onUrlHashChanged() {
    this.prevScreen = this.activeScreen;
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
    if (this.activeScreen === ScreenNumber.STORY) {
      this.bodyElement.classList.add(`theme-active`);
      return;
    }
    this.bodyElement.classList.remove(`theme-active`);
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
  }

  changeVisibilityDisplay() {
    let isStoryToPrizes = this.prevScreen === ScreenNumber.STORY && this.activeScreen === ScreenNumber.PRIZES;
    let isPrizesToRules = this.prevScreen === ScreenNumber.PRIZES && this.activeScreen === ScreenNumber.RULES;
    let timeout = 0;

    this.curtainElement.classList.remove(`showed`);
    if (isStoryToPrizes) {
      this.curtainElement.classList.add(`showed`);
      timeout = this.CURTAIN_TIMEOUT;
    }

    if (isPrizesToRules) {
      let footerNote = this.screenElements[this.prevScreen].querySelector(`.screen__footer-note`);
      footerNote.classList.add(`hide`);
      timeout = this.CURTAIN_TIMEOUT;
      setTimeout(() => {
        footerNote.classList.remove(`hide`);
      }, timeout);
    }

    setTimeout(() => {
      this.screenElements.forEach((screen) => {
        screen.classList.add(`screen--hidden`);
        screen.classList.remove(`active`);
      });
      this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
      setTimeout(() => {
        this.screenElements[this.activeScreen].classList.add(`active`);
      }, 100);
    }, timeout);
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
