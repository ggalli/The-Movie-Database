import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, createSearchParams } from "react-router-dom";
import ReactPaginate from 'react-paginate';

import { Button } from "../components/Button";
import { MovieCard } from "../components/MovieCard";
import { api } from "../services/api";

import "../styles/home.scss";

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
  const [totalPages, setTotalPages] = useState(500); //default 500 because of api max validation
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const filter = searchParams.get('filter');
  const page = Number(searchParams.get('page'));

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
      let response = await api.get("/movie/popular", {
        params: { page: page === 0 ? page + 1 : page }
      });
      if (response.status === 200) {
        const { results, total_pages } = response.data;
        setMovies(results);
        if (total_pages < totalPages) {
          setTotalPages(total_pages);
        }
      }
    }

    async function getFilteredMovies() {
      let response = await api.get("/discover/movie", {
        params: { with_genres: filter, page: page === 0 ? page + 1 : page }
      });

      if (response.status === 200) {
        const { results, total_pages } = response.data;
        setMovies(results);
        if (total_pages < totalPages) {
          setTotalPages(total_pages);
        }
      }
    }

    window.scrollTo(0, 0);
    
    if(filter) {
      getFilteredMovies();
      return;
    }

    getMovies();
    return;

  }, [filter, page, totalPages]);

  function filterMovies(genreId: number) {
    const genre = genreId.toString();

    const newParams = createSearchParams(searchParams);

    if (filter === genre) {
      newParams.delete('filter')
    } else {
      newParams.set('filter', genre)
    }
    
    newParams.delete('page')
    setSearchParams(newParams);
  }

  function handlePageClick(event: { selected: number }) {
    const newParams = createSearchParams(searchParams);

    const page = event.selected + 1; //+1 because event is an index value and page param not

    newParams.set('page', page.toString());
    setSearchParams(newParams);
  };

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
                    active={filter === genre.id.toString()}
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

          <div className="pagination">
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={handlePageClick}
              forcePage={page === 0 ? 0 : page - 1} //check page because ReactPaginate works with index value and page param not
              breakLabel="..."
              nextLabel="&#10095;"
              previousLabel="&#10094;"
              containerClassName="pagination__buttons"
              breakClassName="pagination__button"
              pageClassName="pagination__button"
              previousClassName="pagination__button"
              nextClassName="pagination__button"
              pageLinkClassName="pagination__button--link"
              breakLinkClassName="pagination__button--link"
              previousLinkClassName="pagination__button--link"
              nextLinkClassName="pagination__button--link"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
