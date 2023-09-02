import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from '../../assets/images/logo.png';
import cartIcon from '../../assets/icons/Vector.svg';
import homeIcon from '../../assets/icons/icons8-home.svg';

function NavBar({ handleChange, handleClick }: any) {
  return (
    <nav className="nav-bar">
      <div className="nav-search-container">
        <Link to="/">
          <img src={ logo } alt="logo" />
        </Link>
        <label className="search-label">
          <input
            type="text"
            data-testid="query-input"
            placeholder="Busque por um produto"
            className="search-input"
            onChange={ handleChange }
          />
          <button
            className="search-btn"
            data-testid="query-button"
            onClick={ handleClick }
          >
            Pesquisar
          </button>
        </label>
      </div>
      <div className="nav-icons">
        <Link to="/">
          <img src={ homeIcon } alt="" className="home-icon-img" />
        </Link>
        <button className="cart-icon">
          <Link to="/carrinho" data-testid="shopping-cart-button">
            <img src={ cartIcon } alt="" className="cart-icon-img" />
          </Link>
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
