import {Link} from "react-router-dom"
const Book = (props) => {
    return (
        <Link to={`/book/${props.id}`}>
            <div className='book'>
                <p className='bookImage' />
                {props.title} <br/>
                {props.author}
            </div>
        </Link>
    )
}

export default Book