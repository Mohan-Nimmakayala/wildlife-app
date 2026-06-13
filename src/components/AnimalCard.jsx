import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addFavorite } from "../features/favoriteSlice";

function AnimalCard({ animal, onDelete }) {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user"));

    function handleFavorite() {
        dispatch(addFavorite(animal));
    }

    return (
        <div className="card">
            <img src={animal.image} alt={animal.name} />

            <h3>{animal.name}</h3>

            <p>{animal.country}</p>

            <p>{animal.category}</p>

            <p>⭐ {animal.rating}</p>

            <div className="card-actions">
                <Link
                    className="view-btn"
                    to={`/animals/${animal.id}`}
                >
                    View
                </Link>

                <Link
                    className="edit-btn"
                    to={`/edit-animal/${animal.id}`}
                >
                    Edit
                </Link>

                {user && (
                    <button className="favorite-btn" onClick={handleFavorite}>
                        ❤ Add To Favorites
                    </button>
                )}

                <button
                    className="delete-btn"
                    onClick={() => onDelete(animal.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default AnimalCard;

