import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgressbar } from 'react-circular-progressbar';

import { ActorCard } from '../components/ActorCard';
import { MovieCard } from '../components/MovieCard';
import { api } from '../services/api';
import { convertMinutesToHours, formatDate, getMainByPopularity } from '../utils';

import 'react-circular-progressbar/dist/styles.css';
import '../styles/movie.scss';
import placeholder from '../assets/images/movie-placeholder.jpg';

type CastProps = {
  id: number;
  name: string;
  popularity: number;
  character: string;
  profile_path: string;
}

type CrewProps = {
  credit_id: number;
  name: string;
  job: string;
  popularity: number;
}

type RecommendationProps = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  popularity: number;
}

type VideoProps = {
  id: string;
  key: string;
  name: string;
  official: boolean;
}

type MovieProps = {
  id: number;
  title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  original_language: string;
  genres: Array<Record<string, {
    name: string
  }>>
  credits: {
    cast: Array<CastProps>,
    crew: Array<CrewProps>,
  }
  recommendations: {
    results: Array<RecommendationProps>
  }
  videos: {
    results: Array<VideoProps>
  }
}

function getOfficialTrailer(trailers:Array<VideoProps>) {
  return trailers.filter(trailer => trailer.name === 'Official Trailer')[0];
}

export function Movie() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieProps>();
  const [recommendations, setRecommendations] = useState<RecommendationProps[]>();
  const [crew, setCrew] = useState<CrewProps[]>();
  const [cast, setCast] = useState<CastProps[]>();
  const [video, setVideo] = useState<VideoProps>();

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    async function getMovie() {
      let response = await api.get(`/movie/${movieId}`, {
        params: {
          append_to_response: 'credits,recommendations'
        }
      });
      if (response.status === 200) {
        const { recommendations, credits } = response.data;
        setMovie(response.data); 
        setRecommendations(getMainByPopularity(recommendations.results, 6)); 
        setCrew(getMainByPopularity(credits.crew, 5));
        setCast(getMainByPopularity(credits.cast, 20));
      }
    }

    async function getVideos() {
      let response = await api.get(`/movie/${movieId}/videos`, {
        params: {
          language: null
        }
      });
      if (response.status === 200) {
        setVideo(getOfficialTrailer(response.data.results));
      }
    }

    getMovie();
    getVideos();

  }, [movieId]);

  const release_year = movie?.release_date.split('-')[0];
  const currentDate = new Date();
  const date_from_now = currentDate.getFullYear() - Number(release_year);
  const genres = movie?.genres.map(genre => genre.name).join(', ');

  return (
    <div className="movie">
      <div className="hero">
        <div className="container">
          
          <div className="movie-wrapper">
            <img 
              className='movie__image' 
              src={movie?.poster_path ? `https://image.tmdb.org/t/p/w400${movie?.poster_path}` : placeholder} 
              alt={`Poster do filme ${movie?.title}`} 
            />

            <div className='movie__info'>
              <h2 className='movie__title'>{movie?.title} ({release_year})</h2>

              <div className="movie__description">
                <p className='movie__subtitle'>
                  <span>{date_from_now} {date_from_now === 1 ? 'ano' : 'anos'}</span>
                  <span className='dot'> • </span>
                  <span>{formatDate(movie?.release_date)} {`(${movie?.original_language.toUpperCase()})`}</span>
                  <span className='dot'> • </span>
                  <span>{genres}</span>
                  <span className='dot'> • </span>
                  <span>{convertMinutesToHours(movie?.runtime)}</span>
                </p>

                <div className="movie__rating">
                  {movie?.vote_average &&
                    <CircularProgressbar 
                      value={movie?.vote_average * 10} 
                      text={`${movie?.vote_average * 10}%`} 
                    />
                  }
                  <span>Avaliação dos usuários</span>
                </div>

                <h5>Sinopse</h5>
                <p className='movie__overview'>{movie?.overview}</p>

                <div className="movie__crew-wrapper">
                  {crew?.map(person => (
                    <div key={person.credit_id} className="crew">
                      <div className='crew__name'>{person.name}</div>
                      <div className='crew__job'>{person.job}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="container">
        <div className="cast">
          <h3>Elenco original</h3>
          <div className="cast__group">
            {cast?.map(actor => (
              <ActorCard key={actor.id} photoPath={actor.profile_path} name={actor.name} character={actor.character}/>
            ))}
          </div>
        </div>

        <div className="trailer">
          <h3>Trailer</h3>
          <div className="trailer__video">
            <iframe width="900" height="500" src={`https://www.youtube.com/embed/${video?.key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        </div>

        <div className="recommendations">
          <h3>Recomendações</h3>
          <div className="recommendations-wrapper">
            {recommendations?.map(movie => (
              <MovieCard 
                key={movie.id} 
                title={movie.title} 
                release_date={movie.release_date} 
                poster_path={movie.poster_path}
                onClick={() => navigate(`/movies/${movie.id}`)}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}