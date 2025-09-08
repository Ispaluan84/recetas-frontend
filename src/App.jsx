import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import UserPanel from "./components/UserPanel";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Recipes from "./pages/Recipes";
import AddRecipe from "./pages/AddRecipe";
import EditRecipe from "./pages/EditRecipe";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/perfil" element={ <UserPanel />} />
        <Route path="/dashboard" element={ <PrivateRoute><Dashboard /></PrivateRoute> } />
        <Route path="/recipes" element={ <PrivateRoute><Recipes /></PrivateRoute> } />
        <Route path="/recipes/new" element={ <PrivateRoute><AddRecipe /></PrivateRoute> } />      
        <Route path="/recipes/:id/edit" element={ <EditRecipe /> } />
      </Routes>
    </Router>
  );
}

export default App;
