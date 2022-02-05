import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const filter = searchParams.get('filter');

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

  useEffect(() => {

    async function getFilteredMovies() {
      let response = await api.get("/discover/movie", {
        params: { with_genres: filter }
      });

      if (response.status === 200) {
        setMovies(response.data.results);
      }
    }
    getFilteredMovies();

  }, [searchParams]);

  function filterMovies(genreId: number) {
    const genre = genreId.toString();

    if (filter == genre) {
      setSearchParams({})
    } else {
      setSearchParams({ filter: genreId.toString() })
    }
  }

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
                  <Button
                    key={genre.id}
                    active={filter == genre.id.toString()}
                    onClick={() => filterMovies(genre.id)}
                  >
                    {genre.name}
                  </Button>
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
                onClick={() => navigate(`movies/${movie.id}`)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
