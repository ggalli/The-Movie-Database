import { MouseEventHandler } from "react";

import placeholder from '../../assets/images/movie-placeholder.jpg';
import './styles.scss';

type MovieProps = {
  title: string;
  release_date: string;
  poster_path: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export function MovieCard({
  title,
  release_date,
  poster_path,
  onClick,
  ...props
}: MovieProps) {
  return (
    <div className="movie-card" onClick={onClick}>
      <figure>
        <img className='movie-card__image' src={poster_path ? `https://image.tmdb.org/t/p/w200${poster_path}` : placeholder} alt={`Poster do filme ${title}`}/>

        <figcaption>
          <div className="movie-card__title">
            {title}
          </div>
          
          <div className="movie-card__subtitle">
            {release_date}
          </div>
        </figcaption>
      </figure>
    </div>
  )
}