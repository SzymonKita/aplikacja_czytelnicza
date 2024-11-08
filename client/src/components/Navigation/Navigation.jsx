import RightGroup from "./RightGroup";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import "./Navigation.css";

const Navigation = (props) => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <>
            <nav>
                <div className="left-group">
                    <Link to="/"><button type="button">Strona główna</button></Link>
                    <Link to="/booklist"><button type="button">Książki</button></Link>
                    <button type="button">Forum</button>
                    <button type="button">Ranking</button>
                </div>

                <div className="right-group">
                    <RightGroup isLoggedIn={isLoggedIn} /> {}
                </div>
            </nav>
            <h1>{props.title}</h1>
        </>
    );
}

export default Navigation;
