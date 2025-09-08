import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Inicio</Link> | {" "}
      <Link to="/login">Login</Link> | {" "}
      <Link to="/register">Registro</Link> | {" "}
      <Link to="/dashboard">Panel</Link> | {" "}
      <Link to="/recipes">Recetas</Link>
    </nav>
  );
};

export default Navbar;
