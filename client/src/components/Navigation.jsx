import RightGroup from "./RightGroup"
import {Link} from "react-router-dom"
const Naigation = (props) => {
    return (
        <>
        <nav>
            <div className="left-group">
                <Link to="/"><button type="button">Strona główna</button></Link>
                <button type="button">Książki</button>
                <button type="button">Forum</button>
                <button type="button">Ranking</button>
            </div>

            <div className="right-group">
                <RightGroup isLoggedIn={props.isLoggedIn} />
            </div>
        </nav>
        <h1>{props.title}</h1>
        </>
    )
}

export default Naigation