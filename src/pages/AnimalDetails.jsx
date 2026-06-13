import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function AnimalDetails() {
    const { id } = useParams();

    const [animal, setAnimal] = useState(null);

    useEffect(() => {
        async function getAnimal() {
            try {
                const response = await api.get(`/animals/${id}`);

                setAnimal(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getAnimal();
    }, [id]);

    

    if (!animal) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="details">
            <img src={animal.image} alt={animal.name} />

            <h1>{animal.name}</h1>

            <p>{animal.description}</p>

            <h3>Country</h3>
            <p>{animal.country}</p>

            <h3>Category</h3>
            <p>{animal.category}</p>

            <h3>Best Time To Spot</h3>
            <p>{animal.bestTimeToSpot}</p>

            <h3>Lifespan</h3>
            <p>{animal.lifespan}</p>

            <h3>Weight</h3>
            <p>{animal.weight}</p>

            <h3>Diet</h3>
            <p>{animal.diet}</p>

            <h3>Conservation Status</h3>
            <p>{animal.conservationStatus}</p>

            <h3>Habitat</h3>
            <p>{animal.habitat}</p>

            <h3>Population</h3>
            <p>{animal.population}</p>

            <h3>Rating</h3>
            <p>{animal.rating}</p>

            <h3>Famous For</h3>
            <p>{animal.famousFor}</p>

            <h3>Where To Spot</h3>

            <ul>
                {animal.locations && animal.locations.map((place, index) => (
                    <li key={index}>{place}</li>
                ))}
            </ul>
        </div>
    );
}

export default AnimalDetails;
