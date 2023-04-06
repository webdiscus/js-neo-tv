import { GET, GET_3 } from './api.js';
import { gEl, cEl, randomNum } from './utils.js';

const bodyEl = gEl('body');
const modalOverlay = cEl('div');
modalOverlay.classList.add('modal-overlay');

bodyEl.appendChild(modalOverlay);

//  nav content

function createNav(home, search) {
  const nav = cEl('nav');
  nav.classList.add('nav');
  const title = cEl('h2');
  const menuItems = ['home', 'search'];

  const ul = cEl('ul');
  ul.classList.add('nav-list');

  // menu list
  menuItems.forEach((item) => {
    const li = cEl('li');
    const a = cEl('a');
    a.classList.add('list-text');
    a.textContent = item;
    ul.appendChild(li);
    li.appendChild(a);
  });
  ul.children[0].firstChild.href = home;
  ul.children[1].firstChild.href = search;

  title.classList.add('title');
  title.textContent = 'tv show';

  bodyEl.appendChild(nav);
  nav.appendChild(title);
  nav.appendChild(ul);
}

// Home Page - Hero content

function createHero() {
  const hero = cEl('section');
  hero.classList.add('hero');
  const heroRight = cEl('div');
  heroRight.classList.add('r-wrapper');
  const heroLeft = cEl('div');
  heroLeft.classList.add('l-wrapper');
  const heroImg = cEl('img');
  heroImg.classList.add('hero-img');
  const logo = cEl('h1');
  logo.classList.add('logo');

  heroImg.src =
    'https://images.unsplash.com/photo-1597002973885-8c90683fa6e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3528&q=80';

  logo.innerHTML = `.neo <span class="sub">by filippo</span>`;

  bodyEl.appendChild(hero);
  hero.appendChild(heroLeft);
  hero.appendChild(heroRight);
  heroLeft.appendChild(heroImg);
  heroRight.appendChild(logo);
}

// Home Page - Main content

function createMain() {
  const sliderWrapper = cEl('section');
  sliderWrapper.classList.add('slider-wrapper');

  bodyEl.appendChild(sliderWrapper);

  Promise.all([
    GET_3('top_rated', `${randomNum}`),
    GET_3('popular', `${randomNum}`),
    GET_3('on_the_air', `${randomNum}`),
  ])
    .then((data) => {
      displayCards(
        data[0].results,
        'slider_first',
        'sliderInner_first',
        'category_first',
        'top rated'
      );
      displayCards(
        data[1].results,
        'slider_second',
        'sliderInner_second',
        'category_second',
        'popular'
      );
      displayCards(
        data[2].results,
        'slider_third',
        'sliderInner_third',
        'category_third',
        'on the air'
      );
    })
    .then(() => {
      const cards = document.querySelectorAll('.movie-card');

      cards.forEach((card) =>
        card.addEventListener('click', () => {
          modalOverlay.classList.add('show');
          GET(card.id).then((selectedCard) => {
            displayModal(selectedCard);
          });
        })
      );
    });

  const displayCards = (item, slider, sliderInner, category, cat_name) => {
    category = cEl('h2');
    category.classList.add('category');
    slider = cEl('div');
    slider.classList.add('slider');
    sliderInner = cEl('div');
    sliderInner.classList.add('slider-inner');

    category.textContent = `${cat_name}`;

    sliderWrapper.appendChild(category);
    sliderWrapper.appendChild(slider);
    slider.appendChild(sliderInner);
    // scrollControl(sliderInner);

    item.forEach((element) => {
      const movieCard = cEl('div');
      movieCard.classList.add('movie-card');
      movieCard.setAttribute('id', `${element.id}`);

      const movieCardImg = cEl('img');
      movieCardImg.classList.add('card-img');

      const ratings = cEl('div');
      ratings.classList.add('ratings');
      const rateBar = cEl('div');
      rateBar.classList.add('rate-bar');
      const rateBarInner = cEl('div');
      rateBarInner.classList.add('rate-inner');

      rateBarInner.style.height = `${element.vote_average * 10}%`;

      ratings.textContent = `${element.vote_average}`;

      // movieCard.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${element.poster_path})`;
      movieCardImg.src = `https://image.tmdb.org/t/p/w500/${element.poster_path}`;

      sliderInner.appendChild(movieCard);
      movieCard.appendChild(ratings);
      movieCard.appendChild(rateBar);
      movieCard.appendChild(movieCardImg);
      rateBar.appendChild(rateBarInner);
    });
  };

  // MODAL

  const displayModal = (data) => {
    const {
      name,
      poster_path: image,
      overview,
      number_of_seasons: seasons,
      number_of_episodes: ep,
    } = data;

    const modal = cEl('div');
    modal.classList.add('modal');
    const modalImg = cEl('img');
    modalImg.classList.add('modal-img');
    const modalTitle = cEl('h2');
    modalTitle.classList.add('modal-title');
    const description = cEl('p');
    description.classList.add('modal-description');
    const nSeasons = cEl('p');
    nSeasons.classList.add('modal-description');
    const nEp = cEl('span');
    nEp.classList.add('modal-description');

    nEp.textContent = `Episodes ${ep}`;
    nSeasons.textContent = `Seasons ${seasons} - `;
    description.textContent = overview;
    modalTitle.textContent = name;
    modalImg.src = `https://image.tmdb.org/t/p/w500/${image}`;

    modalOverlay.appendChild(modal);
    modal.appendChild(modalTitle);
    modal.appendChild(nSeasons);
    nSeasons.appendChild(nEp);
    modal.appendChild(modalImg);
    modal.appendChild(description);

    // Blocking body scroll when displaying modal
    bodyEl.style.overflow = 'hidden';
  };

  modalOverlay.addEventListener('mousedown', () => {
    const modalCard = gEl('.modal');
    modalOverlay.classList.remove('show');

    bodyEl.style.overflow = 'scroll';

    modalCard.remove();
  });
}

// Footer content

function createFooter(home, search) {
  const footer = cEl('section');
  footer.classList.add('footer');
  const menuItems = ['home', 'search', 'contact'];
  const ul = cEl('ul');
  ul.classList.add('footer-list');
  const logo = cEl('h3');
  logo.classList.add('footer-logo');

  logo.innerHTML = '&copy; by filippo ';

  menuItems.forEach((item) => {
    const li = cEl('li');
    const a = cEl('a');
    a.textContent = item;
    ul.appendChild(li);
    li.appendChild(a);
  });
  ul.children[0].firstChild.href = home;
  ul.children[1].firstChild.href = search;
  ul.children[2].firstChild.href = '#';

  bodyEl.appendChild(footer);
  footer.appendChild(logo);
  footer.appendChild(ul);
}

export { createNav, createHero, createMain, createFooter };
