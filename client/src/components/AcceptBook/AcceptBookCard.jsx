import { Link } from "react-router-dom"
const AcceptBookCard = ({ book }) => {
    // TODO: zmienić na wczytywanie z bazy danych
    const coverImagePath = `/covers/1.png`;
    return (
        <Link to={`/acceptBook/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className='acceptBookCard'>
                <img src={coverImagePath} alt={`${book.title} cover`} className='acceptBookCardImage' />
                <div>
                    <p><b>Tytuł: </b>{book.title}</p>
                    <p><b>Autor: </b>{book.author}</p>
                    <p><b>Wydawnictwo: </b>{book.publisher}</p>
                    <p><b>Seria: </b>{book.series}</p>
                </div>
                <p className='acceptBookCardDescription'><b>Opis:</b>{book.description.substring(0,300)}...</p>
            </div>
        </Link>
    )
}

export default AcceptBookCard