import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function EditAnimal() {
    const { id } = useParams();
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

    useEffect(() => {
        async function getAnimal() {
            const response = await api.get(`/animals/${id}`);
            const data = response.data;
            setFormData({
                ...data,
                locations: data.locations ? data.locations.join(", ") : "",
            });
        }
        getAnimal();
    }, [id]);

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

        await api.put(`/animals/${id}`, dataToSubmit);

        navigate("/animals");
    }

    return (
        <div className="form-container" style={{ maxWidth: "900px" }}>
            <h2 className="page-title">Edit Animal</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <input type="text" name="name" value={formData.name || ""} placeholder="Name" onChange={handleChange} required />
                    <input type="text" name="country" value={formData.country || ""} placeholder="Country" onChange={handleChange} required />

                    <input type="text" name="category" value={formData.category || ""} placeholder="Category" onChange={handleChange} required />
                    <input type="text" name="habitat" value={formData.habitat || ""} placeholder="Habitat" onChange={handleChange} required />

                    <input type="text" name="lifespan" value={formData.lifespan || ""} placeholder="Lifespan" onChange={handleChange} />
                    <input type="number" step="0.1" name="rating" value={formData.rating || ""} placeholder="Rating" onChange={handleChange} />

                    <input type="number" name="population" value={formData.population || ""} placeholder="Population" onChange={handleChange} />
                    <input type="text" name="diet" value={formData.diet || ""} placeholder="Diet" onChange={handleChange} />

                    <input type="text" name="conservationStatus" value={formData.conservationStatus || ""} placeholder="Conservation Status" onChange={handleChange} />
                    <input type="text" name="weight" value={formData.weight || ""} placeholder="Weight" onChange={handleChange} />

                    <input type="text" name="famousFor" value={formData.famousFor || ""} placeholder="Famous For" onChange={handleChange} />
                    <input type="text" name="bestTimeToSpot" value={formData.bestTimeToSpot || ""} placeholder="Best Time To Spot" onChange={handleChange} />

                    <div className="form-full-width">
                        <input type="text" name="image" value={formData.image || ""} placeholder="Image URL" onChange={handleChange} required />
                    </div>

                    <div className="form-full-width">
                        <input type="text" name="locations" value={formData.locations || ""} placeholder="Locations (comma separated)" onChange={handleChange} />
                    </div>

                    <div className="form-full-width">
                        <textarea name="description" value={formData.description || ""} placeholder="Description" onChange={handleChange} required />
                    </div>
                </div>

                <button className="submit-btn">Update Animal</button>
            </form>
        </div>
    );
}

export default EditAnimal;
