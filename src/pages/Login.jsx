import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await api.get(
            `/users?email=${email}&password=${password}`,
        );

        if (response.data.length > 0) {
            localStorage.setItem("user", JSON.stringify(response.data[0]));

            navigate("/");
            window.location.reload();
        } else {
            alert("Invalid Credentials");
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="auth-btn">Login</button>
                </form>

                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
