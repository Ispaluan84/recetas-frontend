import { useState, useContext} from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";

export default function AddRecipe() {
    const [form, setForm] = useState({ title: "", ingredients: "", instructions: ""});
    const [error, setError] = useState("");
    const { user } = useContext(AuthContext);
    const navigate = useNavigate;

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
           await axios.post("/recipes", form, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
            });
            navigate("/recipes");
        } catch (err) {
            setError("Error al crear receta");
        }
    };

    return (
        <RecipeForm
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
            error={error}
            titleForm="Agregar Nueva Receta"
        />     
    );
}

