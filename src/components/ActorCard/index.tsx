import './styles.scss';

type ActorCardProps = {
  photoPath: string;
  name: string;
  character: string;
}

export function ActorCard({ photoPath, name, character }: ActorCardProps) {
  return (
    <div className="actor-card">
      <img className='actor-card__photo' src={`https://image.tmdb.org/t/p/w200${photoPath}`} alt={`Foto do ator ${name}`} />
      <div className="actor-card__name">{name}</div>
      <div className="actor-card__character">{character}</div>
    </div>
  )
}
