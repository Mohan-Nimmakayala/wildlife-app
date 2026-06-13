import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
    const user = JSON.parse(localStorage.getItem("user"));
    const favorites = useSelector((state) => state.favorites);

    return (
        <nav id="main-navbar">
            <Link to="/" className="nav-brand" id="nav-brand">
                <span className="nav-logo">🐾</span>
                <span className="nav-title">Wildlife Explorer</span>
            </Link>

            <div className="nav-links">
                <Link to="/" id="nav-home">Home</Link>

                <Link to="/animals" id="nav-animals">Animals</Link>

                <Link to="/compare" id="nav-compare">Compare</Link>

                {user && (
                    <Link to="/favorites" id="nav-favorites">
                        ❤️ Favorites
                        {favorites.length > 0 && (
                            <span className="nav-badge">{favorites.length}</span>
                        )}
                    </Link>
                )}

                {!user && (
                    <>
                        <Link to="/register" id="nav-register">Register</Link>

                        <Link to="/login" className="nav-login-btn" id="nav-login">Login</Link>
                    </>
                )}

                {user && <Link to="/logout" id="nav-logout">Logout</Link>}
            </div>
        </nav>
    );
}

export default Navbar;
