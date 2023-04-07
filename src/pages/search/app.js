import { GET_2 } from '../../utils/api.js';
import { createNav, createFooter } from '../../utils/functions.js';
import { cEl, gEl, removeBefore } from '../../utils/utils.js';

import './style.css';

window.addEventListener('DOMContentLoaded', () => createNav('/', '/search'));

// List

const displayMain = () => {
  const bodyEl = gEl('body');

  const searchWrapper = cEl('section');
  searchWrapper.classList.add('search-wrapper');

  const form = cEl('form');
  form.classList.add('search-form');
  const searchInput = cEl('input');
  searchInput.classList.add('search-movie');
  searchInput.type = 'text';
  searchInput.placeholder = 'search';
  const inputSubmit = cEl('input');
  inputSubmit.classList.add('btn');
  inputSubmit.type = 'submit';
  inputSubmit.value = 'enter';

  bodyEl.appendChild(searchWrapper);
  searchWrapper.appendChild(form);
  form.appendChild(searchInput);
  form.appendChild(inputSubmit);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  inputSubmit.addEventListener('click', () => {
    GET_2(searchInput.value).then((data) => displaySearch(data.results));

    removeBefore();
  });

  const displaySearch = (data) => {
    data.forEach((element) => {
      const {
        poster_path: image,
        overview,
        name,
        first_air_date: released,
        vote_average: rating,
      } = element;

      const infoWrapper = cEl('div');
      infoWrapper.classList.add('info-w');
      const infoImg = cEl('img');
      infoImg.classList.add('info-img');
      const textInfo = cEl('div');
      textInfo.classList.add('t-info');
      const desc = cEl('p');
      const title = cEl('h2');
      const date = cEl('p');

      // rating

      const ratings = cEl('div');
      ratings.classList.add('ratings');

      // content

      ratings.textContent = parseFloat(rating).toFixed(1);

      date.textContent = `${released} - First release`;
      title.textContent = name;
      desc.textContent = overview;

      if (image) {
        infoImg.src = `https://image.tmdb.org/t/p/w500/${image}`;
      } else {
        infoImg.src = `https://semantic-ui.com/images/wireframe/square-image.png`;
      }

      searchWrapper.appendChild(infoWrapper);
      infoWrapper.appendChild(infoImg);
      infoWrapper.appendChild(textInfo);
      textInfo.appendChild(title);
      textInfo.appendChild(desc);
      textInfo.appendChild(date);
      textInfo.appendChild(ratings);
    });
  };
};

window.addEventListener('DOMContentLoaded', displayMain);
window.addEventListener('DOMContentLoaded', () =>
  createFooter('/', './search')
);
