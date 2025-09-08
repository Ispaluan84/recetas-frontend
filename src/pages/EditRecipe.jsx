import { useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import RecipeForm from "../components/RecipeForm";

export default function EditRecipe() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [form, setForm] = useState({ title: "", ingredients: "", instructions: "" })
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get(`/recipes/${id}`)
            .then(res => setForm(res.data))
            .catch(() => setError("Error al cargar la receta"));
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/recipes/${id}`, form, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            navigate("/recipes");
        } catch {
            setError("Error al actualizar receta");
        }
    };

    return (
        <RecipeForm
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
            error={error}
            titleForm="Editar Receta"
        />
    );
}
