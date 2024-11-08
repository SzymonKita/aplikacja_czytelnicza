import { Link } from "react-router-dom";

const Book = (props) => {
    const coverImagePath = `http://localhost:5000/covers/${props.cover}`;

    return (
        <Link to={`/book/${props.id}`}>
            <div className='book'>
                <img src={coverImagePath} alt={props.title} className='bookImage' />
                <p>{props.title}</p>
                <p>{props.author}</p>
            </div>
        </Link>
    );
};

export default Book;
