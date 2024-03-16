import "./Header.scss";
import Logo from "../../assets/logo/InStock-Logo.svg";
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';


function Header() {

    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState('');

    const goToPage = (path) => {
        navigate(path);
        setActiveButton(path);
    };

    return (
        <header className="header">
            <div className="header-wrapper">
                <Link to="/warehouses">
                    <img className="header-logo" src={Logo} alt="Logo" />
                </Link>
                <ul className="header-navbar">
                    <li className="header-navbar__items">
                        <button className={`nav-button ${activeButton === '/warehouses' ? 'active' : ''}`} onClick={() => goToPage('/warehouses')}>Warehouses</button>
                    </li>
                    <li className="header-navbar__items">
                        <button className={`nav-button ${activeButton === '/inventories' ? 'active' : ''}`} onClick={() => goToPage('/inventories')}>Inventory</button>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header;