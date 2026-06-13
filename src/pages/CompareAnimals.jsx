import { useEffect, useState } from "react";
import api from "../services/api";

function CompareAnimals() {
    const [animals, setAnimals] = useState([]);
    const [animalA, setAnimalA] = useState(null);
    const [animalB, setAnimalB] = useState(null);

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

    function handleSelectA(e) {
        const selected = animals.find((a) => a.id === e.target.value);
        setAnimalA(selected || null);
    }

    function handleSelectB(e) {
        const selected = animals.find((a) => a.id === e.target.value);
        setAnimalB(selected || null);
    }

    function getStatusClass(status) {
        if (!status) return "";
        const s = status.toLowerCase();
        if (s.includes("endangered")) return "status-endangered";
        if (s.includes("vulnerable")) return "status-vulnerable";
        if (s.includes("near threatened")) return "status-near-threatened";
        return "status-safe";
    }

    function renderStars(rating) {
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5;
        let stars = "";
        for (let i = 0; i < full; i++) stars += "★";
        if (half) stars += "½";
        return stars;
    }

    function getMaxPopulation() {
        if (!animalA && !animalB) return 1;
        const popA = animalA?.population || 0;
        const popB = animalB?.population || 0;
        return Math.max(popA, popB, 1);
    }

    function renderHighlight(valA, valB, field) {
        if (!animalA || !animalB) return { classA: "", classB: "" };
        if (field === "rating") {
            if (valA > valB) return { classA: "compare-winner", classB: "" };
            if (valB > valA) return { classA: "", classB: "compare-winner" };
        }
        if (field === "population") {
            if (valA > valB) return { classA: "compare-winner", classB: "" };
            if (valB > valA) return { classA: "", classB: "compare-winner" };
        }
        if (field === "lifespan") {
            const numA = parseInt(valA);
            const numB = parseInt(valB);
            if (numA > numB) return { classA: "compare-winner", classB: "" };
            if (numB > numA) return { classA: "", classB: "compare-winner" };
        }
        return { classA: "", classB: "" };
    }

    const rows = [
        { label: "Category", key: "category", icon: "🏷️" },
        { label: "Habitat", key: "habitat", icon: "🌿" },
        { label: "Country", key: "country", icon: "🌍" },
        { label: "Diet", key: "diet", icon: "🍖" },
        { label: "Weight", key: "weight", icon: "⚖️" },
        { label: "Lifespan", key: "lifespan", icon: "⏳", highlight: "lifespan" },
        { label: "Conservation", key: "conservationStatus", icon: "🛡️", isStatus: true },
        { label: "Rating", key: "rating", icon: "⭐", highlight: "rating" },
        { label: "Population", key: "population", icon: "📊", highlight: "population", isPopulation: true },
        { label: "Famous For", key: "famousFor", icon: "🏆" },
        { label: "Best Time To Spot", key: "bestTimeToSpot", icon: "📅" },
    ];

    const maxPop = getMaxPopulation();

    return (
        <div className="compare-page">
            <div className="compare-header">
                <h1>🔍 Compare Animals</h1>
                <p className="compare-subtitle">
                    Select two wildlife species to compare them side by side
                </p>
            </div>

            <div className="compare-selectors" id="compare-selectors">
                <div className="compare-selector-card">
                    <label htmlFor="compare-animal-a">Animal 1</label>
                    <select
                        id="compare-animal-a"
                        onChange={handleSelectA}
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Select an animal...
                        </option>
                        {animals.map((a) => (
                            <option
                                key={a.id}
                                value={a.id}
                                disabled={animalB?.id === a.id}
                            >
                                {a.name}
                            </option>
                        ))}
                    </select>

                    {animalA && (
                        <div className="compare-preview">
                            <img src={animalA.image} alt={animalA.name} />
                            <h3>{animalA.name}</h3>
                            <span className={`compare-status-badge ${getStatusClass(animalA.conservationStatus)}`}>
                                {animalA.conservationStatus}
                            </span>
                        </div>
                    )}
                </div>

                <div className="compare-vs">
                    <span>VS</span>
                </div>

                <div className="compare-selector-card">
                    <label htmlFor="compare-animal-b">Animal 2</label>
                    <select
                        id="compare-animal-b"
                        onChange={handleSelectB}
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Select an animal...
                        </option>
                        {animals.map((a) => (
                            <option
                                key={a.id}
                                value={a.id}
                                disabled={animalA?.id === a.id}
                            >
                                {a.name}
                            </option>
                        ))}
                    </select>

                    {animalB && (
                        <div className="compare-preview">
                            <img src={animalB.image} alt={animalB.name} />
                            <h3>{animalB.name}</h3>
                            <span className={`compare-status-badge ${getStatusClass(animalB.conservationStatus)}`}>
                                {animalB.conservationStatus}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {animalA && animalB && (
                <div className="compare-table-container" id="compare-table">
                    <table className="compare-table">
                        <thead>
                            <tr>
                                <th className="compare-th-label">Attribute</th>
                                <th className="compare-th-animal">{animalA.name}</th>
                                <th className="compare-th-animal">{animalB.name}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row) => {
                                const valA = animalA[row.key];
                                const valB = animalB[row.key];
                                const { classA, classB } = row.highlight
                                    ? renderHighlight(valA, valB, row.highlight)
                                    : { classA: "", classB: "" };

                                return (
                                    <tr key={row.key}>
                                        <td className="compare-label">
                                            <span className="compare-icon">{row.icon}</span>
                                            {row.label}
                                        </td>
                                        <td className={`compare-value ${classA}`}>
                                            {row.isStatus ? (
                                                <span className={`compare-status-badge ${getStatusClass(valA)}`}>
                                                    {valA}
                                                </span>
                                            ) : row.key === "rating" ? (
                                                <span className="compare-rating">
                                                    <span className="compare-stars">{renderStars(valA)}</span>
                                                    <span className="compare-rating-num">{valA}</span>
                                                </span>
                                            ) : row.isPopulation ? (
                                                <div className="compare-pop-wrapper">
                                                    <div className="compare-pop-bar">
                                                        <div
                                                            className="compare-pop-fill"
                                                            style={{ width: `${(valA / maxPop) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="compare-pop-num">{valA?.toLocaleString()}</span>
                                                </div>
                                            ) : (
                                                valA
                                            )}
                                        </td>
                                        <td className={`compare-value ${classB}`}>
                                            {row.isStatus ? (
                                                <span className={`compare-status-badge ${getStatusClass(valB)}`}>
                                                    {valB}
                                                </span>
                                            ) : row.key === "rating" ? (
                                                <span className="compare-rating">
                                                    <span className="compare-stars">{renderStars(valB)}</span>
                                                    <span className="compare-rating-num">{valB}</span>
                                                </span>
                                            ) : row.isPopulation ? (
                                                <div className="compare-pop-wrapper">
                                                    <div className="compare-pop-bar">
                                                        <div
                                                            className="compare-pop-fill compare-pop-fill-b"
                                                            style={{ width: `${(valB / maxPop) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="compare-pop-num">{valB?.toLocaleString()}</span>
                                                </div>
                                            ) : (
                                                valB
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}

                            <tr>
                                <td className="compare-label">
                                    <span className="compare-icon">📍</span>
                                    Locations
                                </td>
                                <td className="compare-value">
                                    <div className="compare-locations">
                                        {animalA.locations?.map((loc, i) => (
                                            <span key={i} className="compare-location-tag">{loc}</span>
                                        ))}
                                    </div>
                                </td>
                                <td className="compare-value">
                                    <div className="compare-locations">
                                        {animalB.locations?.map((loc, i) => (
                                            <span key={i} className="compare-location-tag">{loc}</span>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {(!animalA || !animalB) && (
                <div className="compare-empty" id="compare-empty-state">
                    <div className="compare-empty-icon">🦁 ⚡ 🐘</div>
                    <h2>Select two animals to begin comparison</h2>
                    <p>Choose one animal from each dropdown above to see a detailed side-by-side comparison.</p>
                </div>
            )}
        </div>
    );
}

export default CompareAnimals;
