import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '5e5ce83ec7d738480aa33266e4d877ae',
    language: 'pt-BR'
  },
});
