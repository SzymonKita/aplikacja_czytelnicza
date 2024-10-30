import RightGroup from "./RightGroup"
import {Link} from "react-router-dom"
import "./Navigation.css"
const Naigation = (props) => {
    return (
        <>
        <nav>
            <div className="left-group">
                <Link to="/"><button type="button">Strona główna</button></Link>
                <Link to='/booklist'><button type="button">Książki</button></Link>
                <button type="button">Forum</button>
                <button type="button">Ranking</button>
            </div>

            <div className="right-group">
                <RightGroup isLoggedIn={true} />
            </div>
        </nav>
        <h1>{props.title}</h1>
        </>
    )
}

export default Naigation