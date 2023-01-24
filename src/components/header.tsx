import { NavLink } from "react-router-dom";

type HeaderProps = { title: string }

const Header = ( {title}: HeaderProps ) => {
    
    return (
        <header>
            <h1>{title}</h1>
            <nav>
                <ul>
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/coin-watchlist'>Watchlist</NavLink></li>
                    <li><NavLink to='/about'>About</NavLink></li>
                </ul>
            </nav>
                
        </header>
    )
}
export default Header;