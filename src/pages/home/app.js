import {
  createNav,
  createHero,
  createMain,
  createFooter,
} from '../../utils/functions.js';

// Project

window.addEventListener('DOMContentLoaded', () =>
  createNav('/js-neo-tv/', '/js-neo-tv/search.html')
);

window.addEventListener('DOMContentLoaded', createHero);
window.addEventListener('DOMContentLoaded', createMain);
window.addEventListener('DOMContentLoaded', () =>
  createFooter('/js-neo-tv/', '/js-neo-tv/search.html')
);
