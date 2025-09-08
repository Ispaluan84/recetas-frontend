import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  console.log("✅ Componente Register montado");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📨 Enviando datos:", form);

    try {
      const res = await axios.post("/auth/register", form);
      console.log("🎉 Registro exitoso:", res.data);
      navigate("/login");
    } catch (err) {
      console.error("❌ Error al registrar:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Error inesperado");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Registro</h2>
      {error && <p className="error-text">{error}</p>}
      <input
        name="username"
        placeholder="Usuario"
        onChange={handleChange}
        value={form.username}
        className="border p-2 w-full"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={handleChange}
        value={form.password}
        className="border p-2 w-full"
        required
      />
      <button type="submit">Registrarse</button>
    </form>
  );
}
