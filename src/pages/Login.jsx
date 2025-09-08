import { useState, useContext } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
 
export default function Login() {
    const [form, setForm] =useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Enviando datos:", form)
            const res = await axios.post("/auth/login", form);
            console.log("Respuesta del backend:", res.data);

            if(!res.data.token) {
                throw new Error("No se recibió token del Backend")
            }
            login(res.data.token);
            navigate("/");
        } catch (err) {
            setError("Credenciales incorrectas");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Iniciar Sesión</h2>
            {error && <p className="error-text">{error}</p>}
            <input 
                name="username"
                placeholder="Usuario"
                onChange={handleChange}
                className="border p-2 w-full"
                required
            />
            <input 
                name="password"
                type="password"
                placeholder="Contraseña"
                onChange={handleChange}
                className="border p-2 w-full"
                required
            />
            <button type="submit">Entrar</button>
        </form>
     );

}