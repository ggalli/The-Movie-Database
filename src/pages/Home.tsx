import { useState, useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
import { Button } from "../components/Button";
import { MovieCard } from "../components/MovieCard";
import "../styles/home.scss";

import { api } from "../services/api";

type GenreProps = {
  id: number;
  name: string;
};

type MovieProps = {
  id: number;
  genre_ids: number[];
  title: string;
  release_date: string;
  poster_path: string;
};

export function Home() {
  const [genres, setGenres] = useState<GenreProps[]>([]);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  // const [searchParams, setSearchParams] = useSearchParams();

  // const filterParam = searchParams.get('filter');

  useEffect(() => {
    async function getGenres() {
      let response = await api.get("/genre/movie/list");
      if (response.status === 200) {
        setGenres(response.data.genres);
      }
    }
    getGenres();
  }, []);

  useEffect(() => {
    async function getMovies() {
      let response = await api.get("/movie/popular");
      if (response.status === 200) {
        setMovies(response.data.results);
      }
    }
    getMovies();
  }, []);

  // function filterMovies(id: number) {
  //   let filtered = movies.filter(movie => movie.genre_ids.includes(id));
  //   setFilteredMovies(filtered);
  //   setSearchParams({ filter: id.toString() });
  // }

  return (
    <div className="home">
      <div className="hero">
        <div className="container">
          <div className="hero-wrapper">
            <h1>Milhões de filmes, séries e pessoas para descobrir. Explore já.</h1>
            
            <div className="hero__filters">
              <span>Filtre por:</span>

              <div className="hero__filters-wrapper">
                {genres.map((genre) => (
                  <Button key={genre.id}>{genre.name}</Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <main>
        <div className="container">
          <div className="movies-wrapper">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.title}
                release_date={movie.release_date}
                poster_path={movie.poster_path}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
