const BASE_URL = `https://api.themoviedb.org/3/tv/`;
const BASE_URL_2 = `https://api.themoviedb.org/3/search/tv?`;

const GET = async (id = '') => {
  const res = await fetch(
    BASE_URL + `${id}?api_key=${process.env.apiKey}&language=en-US`
  );
  const data = await res.json();
  return data;
};

const GET_2 = async (search = 'two') => {
  const res = await fetch(
    BASE_URL_2 +
      `api_key=${process.env.apiKey}&language=en-US&page=1&query=${search}`
  );
  const data = await res.json();
  return data;
};

const GET_3 = async (category = '', page = '') => {
  const res = await fetch(
    BASE_URL +
      `${category}?api_key=${process.env.apiKey}&language=en-US&page=${page}`
  );
  const data = await res.json();
  return data;
};

export { GET, GET_2, GET_3 };
