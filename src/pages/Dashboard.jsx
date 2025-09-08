import { useEffect, useState, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/users', {
          headers: {
            Authorization: `Bearer ${user?.token}`
          }
        });
        setUsers(res.data);
      } catch (err) {
        console.error('Error al cargar usuarios:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Usuarios Registrados</h1>
      
      {loading && <p className="loading">Cargando...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && users.length === 0 &&(
        <p className="empty">No hay usuarios registrados.</p>
      )}
      
      {!loading && users.length > 0 && (
        <ul>
          {users.map((u, index) => (
            <li key={index}>
              👤 {u.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
