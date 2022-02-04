import './styles.scss';
import placeholder from '../../assets/images/avatar-placeholder.png';

type ActorCardProps = {
  photoPath: string;
  name: string;
  character: string;
}

export function ActorCard({ photoPath, name, character }: ActorCardProps) {
  return (
    <div className="actor-card">
      <img className='actor-card__photo' src={photoPath ? `https://image.tmdb.org/t/p/w200${photoPath}` : placeholder} alt={`Foto do ator ${name}`} />
      <div className="actor-card__name">{name}</div>
      <div className="actor-card__character">{character}</div>
    </div>
  )
}
