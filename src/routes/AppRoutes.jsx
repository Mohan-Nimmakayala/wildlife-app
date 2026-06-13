import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Animals from "../pages/Animals";
import AnimalDetails from "../pages/AnimalDetails";
import AddAnimal from "../pages/AddAnimal";
import EditAnimal from "../pages/EditAnimal";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import ProtectedRoute from "./ProtectedRoute";
import Favorites from './../pages/Favorites';
import CompareAnimals from '../pages/CompareAnimals';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/animals" element={<Animals />} />

            <Route path="/compare" element={<CompareAnimals />} />

            <Route path="/animals/:id" element={<AnimalDetails />} />

            <Route
                path="/add-animal"
                element={
                    <ProtectedRoute>
                        <AddAnimal />
                    </ProtectedRoute>
                }
            />

            <Route path="/edit-animal/:id" element={<EditAnimal />} />

            <Route path="/register" element={<Register />} />

            <Route path="/login" element={<Login />} />

            <Route path="/logout" element={<Logout />} />

            <Route path="/favorites" element={
                <ProtectedRoute>
                    <Favorites />
                </ProtectedRoute>
            } />
        </Routes>
    );
}

export default AppRoutes;


