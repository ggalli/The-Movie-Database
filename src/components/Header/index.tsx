import { Link } from "react-router-dom";

import Logo from '../../assets/images/logo.svg';
import './styles.scss';

export function Header() {
  return (
    <header className='header'>
      <div className="container">
        <div className="logo">
          <Link to='/'>
            <img src={Logo} alt="Logo do site The Movie Database" />
          </Link>
        </div>
      </div>
    </header>
  )
}