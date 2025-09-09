import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../styles/Home.scss";

export default function Home() {
    const { user } = useContext(AuthContext);

    return (
        <div className="home-container">
            <h1>Bienvenido a Recetas App 🍽</h1>

            {user ? (
                <p className="logged-in-msg">Hola, {user.username}. ¡Explora nuestras recetas!</p>
            ) : (
                <>
                    <p>Esta es una app púbica para compartir y gestionar recetas.</p>
                    <div className="home-buttons">
                        <Link to="/login" className="btn">Iniciar Sesión</Link>
                        <Link to="/register" className="btn">Registrarse</Link>
                    </div>
                </>
            )}
        </div>
    );
}
