import { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Importujemy useNavigate

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Tworzymy instancję useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Zalogowano pomyślnie!");
      navigate("/dashboard"); // Przekierowanie po zalogowaniu
    } catch (error) {
      console.error("Błąd logowania:", error.message);
    }
  };

  return (
    <div>
      <h2>Zaloguj się</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Zaloguj</button>
      </form>
    </div>
  );
};

export default Login;
