import "./Header.scss";
import Logo from "../../assets/logo/InStock-Logo.svg";
import { useNavigate } from 'react-router-dom';


function Header() {

    const navigate = useNavigate();

    const goToPage = (path) => {
        navigate(path);
    };

    return (
        <header className="header">
            <img className="header-logo" src={Logo} alt="Logo" />
            <ul className="header-navbar">
                {/* <li className="header-navbar__items"><a href="/warehouses">Warehouses</a></li>
                <li className="header-navbar__items"><a href="/inventory">Inventory</a></li> */}
                <li className="header-navbar__items"><button onClick={() => goToPage('/warehouses')}>Warehouses</button></li>
                <li className="header-navbar__items"><button onClick={() => goToPage('/inventory')}>Inventory</button></li>
            </ul>
        </header>
    )
}

export default Header;