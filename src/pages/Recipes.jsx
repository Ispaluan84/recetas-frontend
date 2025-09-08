import { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Recipes() {
    const { user } = useContext(AuthContext);
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const res = await axios.get("/recipes", {
                    headers: {
                        Authorization: `Bearer ${user?.token}`
                    }
                });
                setRecipes(res.data);
            } catch (err) {
                setError("Error al cargar recetas");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [user]);

    const handleDelete = async (id) => {
        if(!window.confirm("¿Estás seguro de que quieres eliminar esta receta?")) return;
    
        try {
            await axios.delete(`/recipes/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setRecipes(recipes.filter(r => r._id !== id));
        } catch (err) {
            console.error("Error al eleminar la receta:", err);
            alert("No se pudo eliminar la receta");
        }
    };

    if(loading) return <p>Cargando recetas...</p>;
    if(error) return <p className="error-text">{error}</p>;

    return (
        <div className="recipes-container">
            <Link to="/recipes/new" className="new-recipe-btn"> ➕ Nueva Receta</Link>
            <h2 className="recipes-title">Recetas</h2>
            {recipes.length === 0 ? (
                <p>No hay recetas registradas.</p>
            ) : (
                <ul className="recipes-list">
                    {recipes.map((recipe) => (
                        <li key={recipe._id} className="recipe-card">
                            <h3 className="recipe-title">{recipe.title}</h3>
                            <p><strong>Ingredientes:</strong> {recipe.ingredients.join(", ")}</p>
                            <p><strong>Instrucciones:</strong> {recipe.instructions}</p>

                            {user?.role === "admin" && ( 
                                <div className="recipe-actions">
                                    <Link to={`/recipes/${recipe._id}/edit`} className="edit-btn">
                                        ✍ Editar
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(recipe._id)}
                                        className="delete-btn">
                                        🗑 Eliminar
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

