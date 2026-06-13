import { useDispatch, useSelector } from "react-redux";

import { removeFavorite } from "../features/favoriteSlice";

function Favorites() {
    const dispatch = useDispatch();

    const favorites = useSelector((state) => state.favorites);

    return (
        <div className="favorites-container">
            <h1 className="page-title">Favorite Animals</h1>

            {favorites.length === 0 ? (
                <div className="empty-favorites">
                    <h2>No Favorite Animals</h2>

                    <p>Add animals from the Animals page.</p>
                </div>
            ) : (
                <div className="favorites-grid">
                    {favorites.map((animal) => (
                        <div key={animal.id} className="favorite-card">
                            <img
                                src={animal.image}
                                alt={animal.name}
                            />

                            <div className="favorite-content">
                                <h2>{animal.name}</h2>

                                <p>🌍 {animal.country}</p>

                                <p>⭐ {animal.rating}</p>

                                <p>🐾 {animal.category}</p>

                                <button
                                    onClick={() =>
                                        dispatch(removeFavorite(animal.id))
                                    }
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favorites;
