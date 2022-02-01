import Logo from '../../assets/images/logo.svg';
import './styles.scss';

export function Header() {
  return (
    <header>
      <div className="container">
        <img src={Logo} alt="Logo do site The Movie Database" />
      </div>
    </header>
  )
}