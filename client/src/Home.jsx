import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/dashboard");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      <h1>Witamy w naszej aplikacji!</h1>
      <p>Proszę się zalogować lub zarejestrować, aby uzyskać pełen dostęp.</p>
      <div>
        <Link to="/login">
          <button>Zaloguj się</button>
        </Link>
        <Link to="/register">
          <button>Zarejestruj się</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
