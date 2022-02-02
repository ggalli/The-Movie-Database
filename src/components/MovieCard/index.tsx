import './styles.scss';

type MovieProps = {
  title: string;
  release_date: string;
  poster_path: string;
}

export function MovieCard({
  title,
  release_date,
  poster_path
}: MovieProps) {
  return (
    <div className="movie-card">
      <figure>
        <img className='movie-card__image' src={`https://image.tmdb.org/t/p/w200${poster_path}`} alt={`Poster do filme ${title}`}/>

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