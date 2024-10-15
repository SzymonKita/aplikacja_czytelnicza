import { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Importujemy useNavigate

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Tworzymy instancję useNavigate

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Rejestracja zakończona sukcesem!");
      navigate("/dashboard"); // Przekierowanie po rejestracji
    } catch (error) {
      console.error("Błąd rejestracji:", error.message);
    }
  };

  return (
    <div>
      <h2>Zarejestruj się</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Hasło"
        />
        <button type="submit">Zarejestruj</button>
      </form>
    </div>
  );
};

export default Register;
