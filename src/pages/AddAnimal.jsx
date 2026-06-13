import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function AddAnimal() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        country: "",
        category: "",
        habitat: "",
        image: "",
        bestTimeToSpot: "",
        lifespan: "",
        rating: "",
        population: "",
        diet: "",
        conservationStatus: "",
        famousFor: "",
        weight: "",
        locations: "",
        description: "",
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const dataToSubmit = {
            ...formData,
            rating: parseFloat(formData.rating) || 0,
            population: parseInt(formData.population) || 0,
            locations: formData.locations.split(",").map((loc) => loc.trim()).filter((loc) => loc),
        };

        await api.post("/animals", dataToSubmit);

        navigate("/animals");
    }

    return (
        <div className="form-container" style={{ maxWidth: "900px" }}>
            <h2 className="page-title">Add New Animal</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                    <input type="text" name="country" placeholder="Country" onChange={handleChange} required />

                    <input type="text" name="category" placeholder="Category (e.g., Mammal, Bird)" onChange={handleChange} required />
                    <input type="text" name="habitat" placeholder="Habitat (e.g., Tropical Forest)" onChange={handleChange} required />

                    <input type="text" name="lifespan" placeholder="Lifespan (e.g., 10-15 Years)" onChange={handleChange} />
                    <input type="number" step="0.1" name="rating" placeholder="Rating (e.g., 4.8)" onChange={handleChange} />

                    <input type="number" name="population" placeholder="Population (e.g., 3000)" onChange={handleChange} />
                    <input type="text" name="diet" placeholder="Diet (e.g., Carnivore, Herbivore)" onChange={handleChange} />

                    <input type="text" name="conservationStatus" placeholder="Conservation Status (e.g., Endangered)" onChange={handleChange} />
                    <input type="text" name="weight" placeholder="Weight (e.g., 200-250 kg)" onChange={handleChange} />

                    <input type="text" name="famousFor" placeholder="Famous For" onChange={handleChange} />
                    <input type="text" name="bestTimeToSpot" placeholder="Best Time To Spot" onChange={handleChange} />

                    <div className="form-full-width">
                        <input type="text" name="image" placeholder="Image URL" onChange={handleChange} required />
                    </div>

                    <div className="form-full-width">
                        <input type="text" name="locations" placeholder="Locations (comma separated)" onChange={handleChange} />
                    </div>

                    <div className="form-full-width">
                        <textarea name="description" placeholder="Description" onChange={handleChange} required />
                    </div>
                </div>

                <button className="submit-btn">Add Animal</button>
            </form>
        </div>
    );
}

export default AddAnimal;
