// modules
import loadInit from './modules/load-init.js';
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll.js';
import accentWords from './modules/accent-words.js';
import prizes from './modules/prizes';
import timeCounter from './modules/time-counter';
import scenes from './modules/scenes';

// init modules
loadInit();
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();
accentWords();
prizes();
timeCounter();
scenes();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();
