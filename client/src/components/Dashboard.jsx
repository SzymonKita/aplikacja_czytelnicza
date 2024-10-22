// src/components/Dashboard.jsx
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Witaj, {user ? user.email : 'Użytkowniku'}</p>
      {/* Tutaj możesz dodać więcej elementów dostępnych po zalogowaniu */}
    </div>
  );
};

export default Dashboard;
