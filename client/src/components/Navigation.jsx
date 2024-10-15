import RightGroup from "./RightGroup"
const Naigation = (props) => {
    return (
        <>
        <nav>
            <div className="left-group">
                <button type="button">Strona główna</button>
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