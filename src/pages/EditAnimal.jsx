import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function EditAnimal() {
    const { id } = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        country: "",
        image: "",
        description: "",
    });

    useEffect(() => {
        async function getAnimal() {
            const response = await api.get(`/animals/${id}`);
            setFormData(response.data);
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

        await api.put(`/animals/${id}`, formData);

        navigate("/animals");
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <button className="submit-btn">Update Animal</button>
            </form>
        </div>
    );
}

export default EditAnimal;
