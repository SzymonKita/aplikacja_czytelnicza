import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase"; // Import Firebase
import { signOut } from "firebase/auth"; // Import signOut z Firebase

const Dashboard = () => {
  const navigate = useNavigate();

  // Sprawdzamy, czy użytkownik jest zalogowany
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        // Jeśli użytkownik nie jest zalogowany, przekierowujemy na stronę logowania
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Funkcja do wylogowania
  const handleLogout = async () => {
    try {
      await signOut(auth); // Wylogowanie użytkownika
      navigate("/"); // Przekierowanie na stronę Home po wylogowaniu
    } catch (error) {
      console.error("Błąd podczas wylogowywania:", error.message);
    }
  };

  return (
    <div>
      <h1>Witamy na Dashboardzie!</h1>
      <p>To strona dostępna tylko dla zalogowanych użytkowników.</p>
      <button onClick={handleLogout}>Wyloguj</button> {/* Przycisk wylogowania */}
    </div>
  );
};

export default Dashboard;
