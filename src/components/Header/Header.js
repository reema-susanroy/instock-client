import "./Header.scss";
import Logo from "../../assets/logo/InStock-Logo.svg";
import { useNavigate } from 'react-router-dom';
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
            <img className="header-logo" src={Logo} alt="Logo" />
            <ul className="header-navbar">
                <li className="header-navbar__items">
                    <button className={`nav-button ${activeButton === '/warehouses' ? 'active' : ''}`} onClick={() => goToPage('/warehouses')}>Warehouses</button>
                </li>
                <li className="header-navbar__items">
                    <button className={`nav-button ${activeButton === '/inventory' ? 'active' : ''}`} onClick={() => goToPage('/inventory')}>Inventory</button>
                </li>
            </ul>
        </header>
    )
}

export default Header;