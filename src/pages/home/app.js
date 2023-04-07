// Imports
import './style.css';

import {
  createNav,
  createHero,
  createMain,
  createFooter,
} from '../../utils/functions.js';

// Project

window.addEventListener('DOMContentLoaded', () => createNav('/', '/search'));

window.addEventListener('DOMContentLoaded', createHero);
window.addEventListener('DOMContentLoaded', createMain);
window.addEventListener('DOMContentLoaded', () => createFooter('/', '/search'));
