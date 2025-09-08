import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UserPanel() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="user-panel">
            <h2>Panel de Usuario</h2>

            {user ? (
                <>
                    <p><strong>Usuario:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>

                    <button
                        onClick={handleLogout}
                        className="logout-button"
                    ></button>
                </>
            ) : (
                <p>No hay usuario autenticado.</p>
            )}
        </div>
    );
}