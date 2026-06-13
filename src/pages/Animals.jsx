import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import AnimalCard from "../components/AnimalCard";
import { Link } from "react-router-dom";

function Animals() {
    const [searchParams] = useSearchParams();
    const initialCategory = searchParams.get("category") || "All";

    const [category, setCategory] = useState(initialCategory);
    const [habitat, setHabitat] = useState("All");
    const [animals, setAnimals] = useState([]);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");

    useEffect(() => {
        async function getAnimals() {
            try {
                const response = await api.get("/animals");
                setAnimals(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getAnimals();
    }, []);



    

    async function deleteAnimal(id) {
        await api.delete(`/animals/${id}`);
        setAnimals(
            animals.filter((animal) => animal.id !== id),
        );
    }

    const filteredAnimals = animals.filter((animal) => {
        const searchMatch = animal.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const categoryMatch =
            category === "All" || animal.category === category;

        const habitatMatch = habitat === "All" || animal.habitat === habitat;

        return searchMatch && categoryMatch && habitatMatch;
    });

    let finalAnimals = [...filteredAnimals];

    if (sort === "high") {
        finalAnimals.sort((a, b) => b.rating - a.rating);
    }

    if (sort === "low") {
        finalAnimals.sort((a, b) => a.rating - b.rating);
    }

    return (
        <>
            <div className="animals-header">
                <h1>Wildlife Species</h1>
                <p className="animals-count">
                    {finalAnimals.length} animals found
                </p>
            </div>

            <Link to="/add-animal" className="add-btn" id="add-animal-btn">
                + Add Animal
            </Link>

            <div className="filters" id="filters-bar">
                <input
                    type="text"
                    placeholder="🔍 Search Animal..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    id="search-input"
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    id="category-filter"
                >
                    <option>All</option>
                    <option>Mammal</option>
                    <option>Bird</option>
                    <option>Reptile</option>
                </select>

                <select
                    value={habitat}
                    onChange={(e) => setHabitat(e.target.value)}
                    id="habitat-filter"
                >
                    <option>All</option>
                    <option>Tropical Forest</option>
                    <option>Grassland</option>
                    <option>Dense Forest</option>
                    <option>Wetland</option>
                    <option>Open Forest</option>
                    <option>Alpine</option>
                    <option>Rainforest</option>
                    <option>Dry Forest</option>
                    <option>Temperate Forest</option>
                    <option>Riverine</option>
                </select>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    id="sort-filter"
                >
                    <option value="">Sort Rating</option>
                    <option value="high">High To Low</option>
                    <option value="low">Low To High</option>
                </select>
            </div>

            <div className="animals" id="animals-grid">
                {finalAnimals.map((animal) => (
                    <AnimalCard
                        key={animal.id}
                        animal={animal}
                        onDelete={deleteAnimal}
                    />
                ))}
            </div>

            {finalAnimals.length === 0 && animals.length > 0 && (
                <div className="no-results">
                    <h2>No animals found</h2>
                    <p>Try adjusting your filters or search term.</p>
                </div>
            )}
        </>
    );
}

export default Animals;
